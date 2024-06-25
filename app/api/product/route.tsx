import knex from '@/lib/knex';

export async function GET() {
    try {
        const products = await knex('product').select('*');
        return Response.json(products);
    } catch (error) {
        return Response.json({ error: 'Error fetching products' });
    }
}

export async function POST(request: Request) {
    const { name, description, price, link } = await request.json();
    try {
        const [pid] = await knex('product').insert({ name, description, price, link }).returning('pid');
        return Response.json({ pid });
    } catch (error) {
        return Response.json({ error: 'Error adding product' });
    }
}

export async function PUT(request: Request) {
    const { pid, name, description, price, link } = await request.json();
    try {
        await knex('product').where({ pid }).update({ name, description, price, link });
        return Response.json({ message: 'Product updated' });
    } catch (error) {
        return Response.json({ error: 'Error updating product' });
    }
}

export async function DELETE(request: Request) {
    const { pid } = await request.json();
    try {
        await knex('product').where({ pid }).del();
        return Response.json({ message: 'Product deleted' });
    } catch (error) {
        return Response.json({ error: 'Error deleting product' });
    }
}
