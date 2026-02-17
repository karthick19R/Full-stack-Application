import { BaseSeeder } from '@adonisjs/lucid/seeders'
 import User from '#models/user'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
  {
    fullName: 'Steve Smith',
    email: 'smith@example.com',
    password: 'secret',
    phoneNumber :'9876543221',
    gender:'male',
    role:'admin'
  },
  {
    fullName: ' Johnson',
    email: 'johnson@example.com',
    password: 'secret',
    phoneNumber :'9876543411',
    gender:'male',
    role:'admin'
  },
  {
    fullName: 'Robert',
    email: 'Robert@example.com',
    password: 'secret',
    phoneNumber :'9876553211',
    gender:'male',
    role:'user'
  },{
    fullName: 'carlos',
    email: 'carlos@example.com',
    password: 'secret',
    phoneNumber :'9876643211',
    gender:'male',
    role:'user'
  },{
    fullName: 'david',
    email: 'david@example.com',
    password: 'secret',
    phoneNumber :'9876843211',
    gender:'male',
    role:'admin'
  },
])

  }
}