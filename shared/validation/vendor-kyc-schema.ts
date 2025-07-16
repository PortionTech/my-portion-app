import { z } from "zod"

export const vendorKycSchema = z.object( {
    firstname: z.string(),
    lastname: z.string(),
    date_of_birth: z.string(),
    phone_number: z.string(),
    email: z.string(),
    bvn: z.string().length(11, "must be 11 numbers"),
    address: z.string(),
    town: z.string(),
    city: z.string(),
    state: z.string(),


    business_name: z.string(),
    business_email:z.email(),
    business_phone_number:z.string(),
    cac_number:z.string(),
    tax_id:z.string(),
    business_address:z.string(),


    id_type:  z.string(),
    id_number: z.string(),
    id_front:  z.file().optional(),
    id_back:  z.file().optional(),
    passport:  z.file().optional(),
    

    utility_bill:   z.file().optional(),
    cac_certificate:  z.file().optional(),
    tax_certificate:  z.file().optional(),
})

export type VendorKycSchema = z.infer<typeof vendorKycSchema>