import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ParsedToken } from 'decorators';
import { VendorKycDTO, vendorKycSchema } from '@shared/validation/vendor-kyc-schema';
import { ZodValidationPipe } from 'pipes/zod-validation-pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { OrderService } from 'src/order/order.service';

@Controller('v1/vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService, private readonly orderService: OrderService ) {}

    @Post('kyc')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'tax_certificate', maxCount: 1 }, 
        { name: 'cac_certificate', maxCount: 1 }, 
        { name: 'utility_bill', maxCount: 1 },
        { name: 'passport', maxCount: 1 },
        { name: 'id_back', maxCount: 1 },
        { name: 'id_fronte', maxCount: 1 }
    ]))
    
    submitKyc(
        @ParsedToken() user: { id: string },  
        @Body(new ZodValidationPipe(vendorKycSchema)) KycDTO: VendorKycDTO,
        @UploadedFiles() files: { 
            tax_certificate?: Express.Multer.File[], 
            cac_certificate?: Express.Multer.File[], 
            utility_bill?: Express.Multer.File[],
            passport?: Express.Multer.File[],
            id_back?: Express.Multer.File[],
            id_front?: Express.Multer.File[] 
        }) {
        
        return this.vendorService.submitKyc(user.id, files, KycDTO);

    }


    @Get('kyc')
    getKycDetails(
        @ParsedToken() user: { id: string },

    ) {
        return this.vendorService.getKycDetails(user.id);
    }

    @Get('order-record')
    getOrderRecord(
        @ParsedToken() user: { id: string },
        @Query('limit') limit: string,
        @Query('page') page: string,
        @Query('status') status: string,
    ) {
        return this.orderService.getProductOrderRecord(user.id, page, limit, status);
    }

}
