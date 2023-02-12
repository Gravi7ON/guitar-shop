import { editFileName, imageFileFilter } from '@backend/core';
import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { PRODUCT_IMAGE_URL } from './file.constant';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
  ) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Param('id', ParseIntPipe) productId: number) {
    await this.fileService.updateImagePath(productId, {
      image: `${PRODUCT_IMAGE_URL}${file.filename}`
    });

    return {
      message: 'Image uploaded successfully!',
      data: {
        originalName: file.originalname,
        fileName: file.filename,
      },
    };
  }

  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
