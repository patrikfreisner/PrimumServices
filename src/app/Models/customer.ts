export class Customer {
    customer_uuid: string;
    birthdate: string;
    gender: string;
    personal_number: string;
    phone: string;
    address: {
        city: string;
        country: string;
        lat: string;
        lon: string;
        state: string;
        street: string;
        neighborhood: string;
        zip_code: string;
        created_at: string;
        update_at: string;
    };
    created_at: string;
    update_at: string;
}
