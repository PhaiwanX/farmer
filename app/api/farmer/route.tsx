import knex from '@/lib/knex';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('q');

    try {
        let farmers;
        if (searchQuery) {
            farmers = await knex('farmer')
                .select('*')
                .where('fullname', 'like', `%${searchQuery}%`);
        } else {
            farmers = await knex('farmer').select('*');
        }
        return Response.json(farmers);
    } catch (error) {
        return Response.json({ error: 'Error fetching farmers' });
    }
}


export async function POST(request: Request) {
    const {
        fullname,
        phone_number,
        id_card,
        address_no,
        address_group,
        address_subdistrict,
        address_district,
        location_x,
        location_y,
        location_amount,
        group,
        plant
    } = await request.json();
    try {
        const [fid] = await knex('farmer').insert({
            fullname,
            phone_number,
            id_card,
            address_no,
            address_group,
            address_subdistrict,
            address_district,
            location_x,
            location_y,
            location_amount,
            group,
            plant
        }).returning('fid');
        return Response.json({ status: "success", message: "Data added" });
    } catch (error) {
        return Response.json({ status: "error", error: 'Error adding farmer', msg: error });
    }
}

export async function PUT(request: Request) {
    const { fid, fullname, phone_number, location, group } = await request.json();
    try {
        await knex('farmer').where({ fid }).update({ fullname, phone_number, location, group });
        return Response.json({ status: "success", message: 'Farmer updated' });
    } catch (error) {
        return Response.json({ status: "error", error: 'Error updating farmer' });
    }
}

export async function DELETE(request: Request) {
    const { fid } = await request.json();
    try {
        await knex('farmer').where({ fid }).del();
        return Response.json({ status: "success", message: 'Farmer deleted' });
    } catch (error) {
        return Response.json({ status: "error", error: 'Error deleting farmer' });
    }
}
