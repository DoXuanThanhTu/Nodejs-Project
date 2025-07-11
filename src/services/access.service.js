"use strict";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const shopModel = require("../models/shop.model");
const keyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //step 1: check mail exits ?
      const holderShop = await shopModel.findOne({ email: email }).lean();
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }
      const passwordHashed = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        //created Public Key, Private Key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1", //Public key CryptoGraphy Standards
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1", //Public key CryptoGraphy Standards
            format: "pem",
          },
        });
        console.log("PrivateKey :", privateKey, " PublicKey :", publicKey); //save collection KeyStore
        const publicKeyString = await keyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });
        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }
        console.log("publicKeyString::", publicKeyString);
        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        console.log("publicKeyObject::", publicKeyObject);
        //create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyString,
          privateKey
        );
        console.log("Created Tokens Success:: ", tokens);
        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}
module.exports = AccessService;
