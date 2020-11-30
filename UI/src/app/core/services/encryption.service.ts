import * as crypto from 'crypto-browserify';
import { environment } from '../../../environments/environment';
import { Constants } from '../../core/constants/cachekey.constant';

export class EncryptionService {

  public static encryptText(plainText: string) {
    let encryptedText = "";
    let encryptionKey = environment.encryptionKey;
    try {
      // random initialization vector
      let iv = crypto.randomBytes(12);

      // random salt
      let salt = crypto.randomBytes(64);

      // derive key: 32 byte key length - in assumption the masterkey is a cryptographic and NOT a password there is no need for
      // a large number of iterations. It may can replaced by HKDF
      let key = crypto.pbkdf2Sync(encryptionKey, salt, 2145, 32, 'sha512');

      // AES 256 GCM Mode
      let cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

      // encrypt the given text
      let encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);

      // extract the auth tag
      let tag = cipher.getAuthTag();

      // generate output
      // let enc = Buffer.concat([salt, iv, tag, encrypted]).toString('base64')
      encryptedText = Buffer.concat([salt, iv, encrypted, tag]).toString('base64');
    } catch (exception) {
      console.log(exception);
    } finally {
      return encryptedText;
    }
  }

  public static decryptText(encryptedText: string) {
    let decryptedText = "";
    let encryptionKey = environment.encryptionKey;
    try {
      // base64 decoding
      let bData = new Buffer(encryptedText, 'base64');

      let salt = bData.slice(0, 64);
      let iv = bData.slice(64, 76);
      let index = bData.length - 16;
      let tag = bData.slice(index, bData.length);
      let text = bData.slice(76, index);

      // derive key using; 32 byte key length
      let key = crypto.pbkdf2Sync(encryptionKey, salt, 2145, 32, 'sha512');
      // AES 256 GCM Mode
      let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(tag);

      // decrypt the given text
      decryptedText = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
    } catch (exception) {
      console.log(exception);
    } finally {
      return decryptedText;
    }
  }
}
