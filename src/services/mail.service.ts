import { transport } from './../config/mailer';
import { IMailOptions } from './../interfaces/email.interface';

class MailService {
    send(mail: IMailOptions) {
        console.log('enviando correo backend');
        console.log('correo ' , mail)
        return new Promise((resolve, reject) => {
            transport.sendMail({
                from: '"🏬Mercado Vida🏬" <mercadovidabd@gmail.com>', // sender address
                to: mail.to, // list of receivers
                subject: mail.subject, // Subject line
                html: mail.html, // html body
              }, (error, _) => {
                  (error) ? reject({
                      status: false,
                      message: error
                  }) : resolve({
                      status: true,
                      message: 'Email correctamente enviado a ' + mail.to,
                      mail
                  });
              });
          });
    }
}

export default MailService;