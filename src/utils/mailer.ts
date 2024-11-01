import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class Mailer {

  transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
  
    });
  }
  async getUpDAteInfoMail(user: { email: any; }) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: 'Nuovo deposito',
      text:
        `Your information is not correct. Mail us with your proper document`,
    };

    return mailOptions;
  }

  async getUpAprooveInfoMail(user: { email: any; }) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: 'Nuovo deposito',
      text: `The account is approved`,
    };

    return mailOptions;
  }
  getPasswordRecoveryMail(toEmail: string, token: string) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: toEmail,
      subject: "Password reset link",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `${process.env.PRODUCTION}/reset?token=${token} \n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged. \n",
    };

    return mailOptions;
  }

  async getDocumentVerificationMail(
    user: any,
    idFront: any,
    idBack: any,
    proofOfAddress: any
  ) {
    const text =
      `L'utente ha richiesto la verifica del profilo ed ha inserito le seguenti informazioni: \n\n` +
      `<ul>\n` +
      `<li>Nome: ${user.first_name}</li>\n` +
      `<li>Nome: ${user.email}</li>\n` +
      `<li>Cognome: ${user.last_name}</li>\n` +
      `<li>Indirizzo: ${user.address}</li>\n` +
      `<li>Città: ${user.city}</li>\n` +
      `<li>Regione: ${user.state}</li>\n` +
      `<li>CAP: ${user.zip}</li>\n` +
      `<li>Nazione: ${user.country}</li>\n` +
      `</ul>\n\n` +
      `La copia fronte e retro di un documento è allegata a questa email `;

    const fileType = await import("file-type");

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Verifica documenti per ${user.first_name} ${user.last_name} (${user.email})`,
      html: text,
      attachments: [
        {
          filename: `id_fronte.${await this.getBase64Extension(
            idFront,
            fileType
          )}`,
          content: idFront,
          encoding: "base64",
        },
        {
          filename: `id_retro.${await this.getBase64Extension(
            idBack,
            fileType
          )}`,
          content: idBack,
          encoding: "base64",
        },
        {
          filename: `proofAddress.${await this.getBase64Extension(
            proofOfAddress,
            fileType
          )}`,
          content: proofOfAddress,
          encoding: "base64",
        },
      ],
    };

    return mailOptions;
  }

  async getDepositInfoMailToAdmin(user: any, amount: any) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Richiesta deposito",
      text:
        `Utente ${user.first_name} ${user.last_name} (${user.email})\n\n` +
        `vuole depositare ${amount}`,
    };

    return mailOptions;
  }
  async getReDepositInfoMailToAdmin(user: any, amount: any, contract: any) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Richiesta Re-investimento",
      text:
        `Utente ${user.first_name} ${user.last_name} (${user.email})\n\n` +
        `vuole reinvestire ${amount}`,
    };

    return mailOptions;
  }
  async getWithdrawInfoMail(
    user: any,
    withdrawNameFull: any,
    bankName: any,
    swift: any,
    withdrawEmail: any,
    amount: any,
    iban: any
  ) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: "Nuovo prelievo",
      text:
        `Utente ${withdrawNameFull}  (${user.email})\n\n` +
        `bankName: ${bankName} ha depositato swift/bic: ${swift} \n\n
        iban:${iban}
      amount:  ${amount}`,
    };

    return mailOptions;
  }

  async getWithdrawInfoMailAdmin(
    user: any,
    withdrawNameFull: any,
    bankName: any,
    swift: any,
    withdrawEmail: any,
    amount: any,
    iban: any
  ) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Richiesta Prelievo",
      text:
        `Utente ${user.first_name} ${user.last_name} (${user.email})\n` +
        `bankName: ${bankName} vuole prelevare swift/bic: ${swift} iban:${iban} amount:  ${amount}`,
    };

    return mailOptions;
  }

  async getWithdrawInfoMailForCrypto(
    user: any,
    amount: any,
    crypto: any,
    cryptoAddress: any
  ) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: "Nuovo prelievo",
      text:
        `Utente ${user.first_name}  (${user.email})\n\n` +
        `ha prelevato ${amount} crypto: ${crypto} cryptoAddress: ${cryptoAddress}`,
    };

    return mailOptions;
  }

  async getWithdrawInfoMailForCryptoAdmin(
    user: any,
    amount: any,
    crypto: any,
    cryptoAddress: any
  ) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Nuovo prelievo",
      text:
        `Utente ${user.first_name} ${user.last_name} (${user.email})\n\n` +
        `ha prelevato ${amount} crypto: ${crypto} cryptoAddress: ${cryptoAddress}`,
    };

    return mailOptions;
  }
  async getBase64Extension(base64Data: any, fileType: any) {
    const mime = await fileType.fileTypeFromBuffer(
      await Buffer.from(base64Data, "base64")
    );
    return mime.ext;
  }

  sendMailAsync(mailOptions: any, callback: any) {
    this.transporter.sendMail(mailOptions, callback);
  }

  sendMailSync(mailOptions: any) {
    const mailer = this;

    return new Promise(function (resolve, reject) {
      mailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
}

export { Mailer };
