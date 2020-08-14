import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '@config/mail';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

// Configurar DSN domínio ->  _amazonses.declabs.com.br / SannI9tdpKXJ9y2X1/6QqQJlYopLqMBRP6ZsE7iF6AI=

@injectable()
export default class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-1',
            }),
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;

        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}
