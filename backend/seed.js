const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const ServiceCenter = require('./models/ServiceCenter');
const Vehicle = require('./models/Vehicle');
const Booking = require('./models/Booking');
const Payment = require('./models/Payment');
const Feedback = require('./models/Feedback');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await ServiceCenter.deleteMany({});
        await Vehicle.deleteMany({});
        await Booking.deleteMany({});
        await Payment.deleteMany({});
        await Feedback.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create Super Admin
        const superAdmin = await User.create({
            name: 'Super Admin',
            email: 'superadmin@vehicleservice.com',
            password: 'admin123',
            phone: '9999999999',
            role: 'superadmin'
        });

        // Create Admin Users
        const admin1 = await User.create({
            name: 'Rajesh Kumar',
            email: 'admin1@vehicleservice.com',
            password: 'admin123',
            phone: '9876543210',
            role: 'admin'
        });

        const admin2 = await User.create({
            name: 'Priya Sharma',
            email: 'admin2@vehicleservice.com',
            password: 'admin123',
            phone: '9876543211',
            role: 'admin'
        });

        // Create Customer Users
        const customer1 = await User.create({
            name: 'Amit Patel',
            email: 'customer1@test.com',
            password: 'password123',
            phone: '8765432100',
            role: 'customer'
        });

        const customer2 = await User.create({
            name: 'Sneha Reddy',
            email: 'customer2@test.com',
            password: 'password123',
            phone: '8765432101',
            role: 'customer'
        });

        const customer3 = await User.create({
            name: 'Vikram Singh',
            email: 'customer3@test.com',
            password: 'password123',
            phone: '8765432102',
            role: 'customer'
        });

        // Create Service Centers
        const center1 = await ServiceCenter.create({
            name: 'AutoCare Premium Services',
            address: { street: '123 MG Road', city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
            phone: '022-12345678',
            email: 'autocare@service.com',
            servicesOffered: ['general_service', 'oil_change', 'brake_repair', 'engine_repair', 'ac_service', 'full_inspection', 'wash_and_detailing'],
            operatingHours: { open: '08:00', close: '20:00' },
            admin: admin1._id,
            rating: 4.5,
            totalReviews: 128,
            description: 'Premium multi-brand auto service center with state-of-the-art equipment and certified technicians.',
            isActive: true
        });

        const center2 = await ServiceCenter.create({
            name: 'SpeedFix Auto Hub',
            address: { street: '456 Brigade Road', city: 'Bangalore', state: 'Karnataka', zipCode: '560001' },
            phone: '080-87654321',
            email: 'speedfix@service.com',
            servicesOffered: ['general_service', 'tire_replacement', 'battery_replacement', 'wheel_alignment', 'painting', 'body_repair', 'electrical_repair'],
            operatingHours: { open: '09:00', close: '19:00' },
            admin: admin2._id,
            rating: 4.2,
            totalReviews: 95,
            description: 'Quick and reliable auto repair services with transparent pricing and swift turnaround times.',
            isActive: true
        });

        const center3 = await ServiceCenter.create({
            name: 'Elite Motors Workshop',
            address: { street: '789 Connaught Place', city: 'New Delhi', state: 'Delhi', zipCode: '110001' },
            phone: '011-55667788',
            email: 'elite@service.com',
            servicesOffered: ['general_service', 'oil_change', 'engine_repair', 'transmission_repair', 'ac_service', 'full_inspection', 'electrical_repair'],
            operatingHours: { open: '08:30', close: '18:30' },
            rating: 4.7,
            totalReviews: 210,
            description: 'Luxury car specialists offering premium service experience with genuine parts warranty.',
            isActive: true
        });

        // Link admins to service centers
        await User.findByIdAndUpdate(admin1._id, { serviceCenterId: center1._id });
        await User.findByIdAndUpdate(admin2._id, { serviceCenterId: center2._id });

        // Create Vehicles
        const vehicle1 = await Vehicle.create({
            owner: customer1._id,
            type: 'car',
            brand: 'Honda',
            model: 'City',
            year: 2022,
            registrationNumber: 'MH01AB1234',
            color: 'Silver',
            fuelType: 'petrol',
            mileage: 25000
        });

        const vehicle2 = await Vehicle.create({
            owner: customer1._id,
            type: 'bike',
            brand: 'Royal Enfield',
            model: 'Classic 350',
            year: 2023,
            registrationNumber: 'MH01CD5678',
            color: 'Black',
            fuelType: 'petrol',
            mileage: 8000
        });

        const vehicle3 = await Vehicle.create({
            owner: customer2._id,
            type: 'car',
            brand: 'Hyundai',
            model: 'Creta',
            year: 2024,
            registrationNumber: 'KA01EF9012',
            color: 'White',
            fuelType: 'diesel',
            mileage: 5000
        });

        const vehicle4 = await Vehicle.create({
            owner: customer3._id,
            type: 'car',
            brand: 'Maruti',
            model: 'Swift',
            year: 2021,
            registrationNumber: 'DL01GH3456',
            color: 'Red',
            fuelType: 'petrol',
            mileage: 35000
        });

        // Create Bookings
        const booking1 = await Booking.create({
            customer: customer1._id,
            vehicle: vehicle1._id,
            serviceCenter: center1._id,
            serviceType: 'general_service',
            scheduledDate: new Date('2026-02-15'),
            scheduledTime: '10:00',
            status: 'completed',
            estimatedCost: 99,
            actualCost: 110,
            isPaid: true,
            notes: 'Regular maintenance service'
        });

        const booking2 = await Booking.create({
            customer: customer2._id,
            vehicle: vehicle3._id,
            serviceCenter: center2._id,
            serviceType: 'tire_replacement',
            scheduledDate: new Date('2026-02-16'),
            scheduledTime: '11:00',
            status: 'in_service',
            estimatedCost: 79,
            actualCost: 85
        });

        const booking3 = await Booking.create({
            customer: customer3._id,
            vehicle: vehicle4._id,
            serviceCenter: center3._id,
            serviceType: 'oil_change',
            scheduledDate: new Date('2026-02-17'),
            scheduledTime: '09:30',
            status: 'pending',
            estimatedCost: 49
        });

        const booking4 = await Booking.create({
            customer: customer1._id,
            vehicle: vehicle2._id,
            serviceCenter: center1._id,
            serviceType: 'brake_repair',
            scheduledDate: new Date('2026-02-18'),
            scheduledTime: '14:00',
            status: 'confirmed',
            estimatedCost: 149
        });

        const booking5 = await Booking.create({
            customer: customer2._id,
            vehicle: vehicle3._id,
            serviceCenter: center1._id,
            serviceType: 'ac_service',
            scheduledDate: new Date('2026-02-10'),
            scheduledTime: '10:00',
            status: 'delivered',
            estimatedCost: 69,
            actualCost: 75,
            isPaid: true
        });

        // Create Payments
        await Payment.create({
            booking: booking1._id,
            customer: customer1._id,
            amount: 110,
            stripePaymentIntentId: 'pi_demo_seed_001',
            status: 'completed'
        });

        await Payment.create({
            booking: booking5._id,
            customer: customer2._id,
            amount: 75,
            stripePaymentIntentId: 'pi_demo_seed_002',
            status: 'completed'
        });

        // Create Feedbacks
        await Feedback.create({
            booking: booking1._id,
            customer: customer1._id,
            serviceCenter: center1._id,
            rating: 5,
            review: 'Excellent service! My car runs like new. Very professional staff.',
            serviceQuality: 5,
            valueForMoney: 4,
            timeliness: 5
        });

        await Feedback.create({
            booking: booking5._id,
            customer: customer2._id,
            serviceCenter: center1._id,
            rating: 4,
            review: 'Good AC repair work. Slightly delayed but overall satisfied.',
            serviceQuality: 4,
            valueForMoney: 4,
            timeliness: 3
        });

        console.log(`
    🌱 Database seeded successfully!
    
    👤 Super Admin:
       Email: superadmin@vehicleservice.com
       Password: admin123
    
    👨‍💼 Admin 1:
       Email: admin1@vehicleservice.com
       Password: admin123
    
    👩‍💼 Admin 2:
       Email: admin2@vehicleservice.com
       Password: admin123
    
    👥 Customer 1:
       Email: customer1@test.com
       Password: password123
    
    👥 Customer 2:
       Email: customer2@test.com
       Password: password123
    
    👥 Customer 3:
       Email: customer3@test.com
       Password: password123
    
    🏢 Service Centers: 3
    🚗 Vehicles: 4
    📋 Bookings: 5
    💳 Payments: 2
    ⭐ Feedbacks: 2
    `);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedDB();
