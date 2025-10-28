import { Controller, Body, UseGuards, Res, Req } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { SignUpBodyDto } from './dto/sign-up/sign-up.body-dto';
import { LoginBodyDto } from './dto/login/login.body-dto';
import { SignUpResponseDto } from './dto/sign-up/sign-up.response-dto';
import { LoginResponseDto } from './dto/login/login.response-dto';
import { JwtGuard } from './guards/jwt.guard';
import { AuthenticatedRequest } from './types/request.types';
import { Context } from 'src/common/decorators/context.decorator';
import { VerificationBodyDto } from './dto/verification/verification.body-dto';
import { fifteenMinutesInMilliseconds } from 'src/common/constants/time.constants';
import { RequestNewOtpBodyDto } from './dto/request-new-otp/request-new-otp.body-dto';
import { SendForgotPasswordOtpBodyDto } from './dto/forgot-password/send-otp/send-otp.body-dto';
import { VerifyForgotPasswordOtpBodyDto } from './dto/forgot-password/verify-otp/verify-otp.body-dto';
import { ResetPasswordBodyDto } from './dto/forgot-password/reset-password/reset-password.body-dto';
import { ChangePasswordBodyDto } from './dto/change-password/change-password.body-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: SignUpResponseDto,
  })
  @Post('sign-up')
  async signup(
    @Body() dto: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signup(dto, res);
  }

  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  login(@Body() dto: LoginBodyDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('verify-email')
  async verifyCode(@Body() dto: VerificationBodyDto) {
    return await this.authService.verifyCode(dto);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() dto: SendForgotPasswordOtpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.sendForgotPasswordOtp(dto, res);
  }

  @Post('verify-forgot-password-otp')
  async verifyForgotPassword(
    @Body() dto: VerifyForgotPasswordOtpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.verifyForgotPassword(dto, res);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordBodyDto) {
    return await this.authService.resetPassword(dto);
  }

  @Post('request-new-otp')
  async requestNewOtp(@Body() dto: RequestNewOtpBodyDto) {
    return await this.authService.requestNewOtp(dto);
  }

  @Post('change-password')
  @UseGuards(JwtGuard('access'))
  async changePassword(
    @Body() dto: ChangePasswordBodyDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.authService.changePassword(dto, req.ctx.uid);
  }

  @Post('refresh')
  @UseGuards(JwtGuard('refresh'))
  async refresh(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
    @Context('refreshToken') refreshToken: string,
  ) {
    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: fifteenMinutesInMilliseconds,
    });

    return { message: 'Token refreshed successfully' };
  }

  @Post('logout')
  @UseGuards(JwtGuard('access'))
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.clearTokenCookie(res, 'access');
    this.authService.clearTokenCookie(res, 'refresh');
    this.authService.clearTokenCookie(res, 'forgotPassword');
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtGuard('access'))
  async getProfile(@Req() req: AuthenticatedRequest) {
    const user = await this.authService.getUserProfile(req.ctx.uid);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        status: user.status,
      },
    };
  }
}
