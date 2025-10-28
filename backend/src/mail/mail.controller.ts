import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailBodyDto } from './dto/mail.body-dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiBody({ type: MailBodyDto })
  async sendMail(@Body() dto: MailBodyDto) {
    await this.mailService.sendEmail(dto);
    return { message: 'Email sent successfully' };
  }
}
