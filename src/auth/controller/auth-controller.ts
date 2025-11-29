import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { Session } from '../schema/sessao';
import { AuthService } from '../service/auth-service';
import { LoginDto } from '../dto/loginDto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login do usuário' })
  @ApiBody({ type: LoginDto, description: 'Dados de login: username e password' })
  @ApiResponse({ status: 201, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Encerrar sessão atual do usuário' })
  @ApiBody({ schema: { type: 'object', properties: { sessionId: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Sessão encerrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async logout(@Body('sessionId') sessionId: string) {
    return this.authService.logout(sessionId);
  }

  @Get('pegarSessao/:idSessao')
  @ApiOperation({ summary: 'Buscar sessão pelo ID' })
  @ApiParam({ name: 'idSessao', description: 'ID da sessão', example: 'uuid-da-sessao' })
  @ApiResponse({ status: 200, description: 'Sessão encontrada'})
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async findIdSession(@Param('idSessao') idSessao: string) {
    return this.authService.findIdSession(idSessao);
  }
  @Get('listarSessao')
  @ApiOperation({ summary: 'Listar seccao' })
  @ApiResponse({ status: 200, description: 'Sessão encontrada'})
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async findAll() {
    return this.authService.findAll();
  }
}
