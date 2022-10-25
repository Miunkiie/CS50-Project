const bcrypt = require('bcryptjs')

const admin = [
    {
        name: 'Admin',
        email: 'Admin@example.com',
        password: bcrypt.hashSync('password', 10),
        admin: true,
    },
]
