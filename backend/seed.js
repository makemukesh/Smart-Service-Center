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
            email: 'superadmin@carservice.com',
            password: 'admin123',
            phone: '9999999999',
            role: 'superadmin'
        });

        // Create Admin Users
        const admin1 = await User.create({
            name: 'Rajesh Kumar',
            email: 'admin1@carservice.com',
            password: 'admin123',
            phone: '9876543210',
            role: 'admin'
        });

        const admin2 = await User.create({
            name: 'Priya Sharma',
            email: 'admin2@carservice.com',
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
            name: 'SmartServ Basic Car Care',
            address: { street: '123 MG Road', city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
            phone: '022-12345678',
            email: 'basic@smartserv.com',
            servicesOffered: ['general_service', 'oil_change', 'brake_repair', 'tire_replacement', 'battery_replacement', 'ac_service', 'wheel_alignment', 'full_inspection', 'wash_and_detailing'],
            operatingHours: { open: '08:00', close: '20:00' },
            admin: admin1._id,
            rating: 4.3,
            totalReviews: 156,
            description: 'Affordable and reliable service center for all budget and mid-range cars. Specializing in Maruti, Hyundai, Tata, Honda, and similar brands with transparent pricing.',
            isActive: true
        });

        const center2 = await ServiceCenter.create({
            name: 'SmartServ Premium Auto Lounge',
            address: { street: '456 Bandra West', city: 'Mumbai', state: 'Maharashtra', zipCode: '400050' },
            phone: '022-87654321',
            email: 'premium@smartserv.com',
            servicesOffered: ['general_service', 'oil_change', 'brake_repair', 'engine_repair', 'tire_replacement', 'battery_replacement', 'ac_service', 'body_repair', 'painting', 'wheel_alignment', 'transmission_repair', 'electrical_repair', 'full_inspection', 'wash_and_detailing'],
            operatingHours: { open: '09:00', close: '19:00' },
            admin: admin2._id,
            rating: 4.8,
            totalReviews: 210,
            description: 'Luxury and premium car specialists for BMW, Mercedes, Audi, Jaguar, and other high-end brands. Certified technicians, genuine OEM parts, and a premium lounge experience.',
            isActive: true
        });

        // Link admins to service centers
        await User.findByIdAndUpdate(admin1._id, { serviceCenterId: center1._id });
        await User.findByIdAndUpdate(admin2._id, { serviceCenterId: center2._id });

        // Create Vehicles (Cars only)
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
            type: 'car',
            brand: 'BMW',
            model: '3 Series',
            year: 2023,
            registrationNumber: 'MH01CD5678',
            color: 'Black',
            fuelType: 'petrol',
            mileage: 12000
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
            estimatedCost: 2499,
            actualCost: 2799,
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
            estimatedCost: 1999,
            actualCost: 2199
        });

        const booking3 = await Booking.create({
            customer: customer3._id,
            vehicle: vehicle4._id,
            serviceCenter: center1._id,
            serviceType: 'oil_change',
            scheduledDate: new Date('2026-02-17'),
            scheduledTime: '09:30',
            status: 'pending',
            estimatedCost: 1499
        });

        const booking4 = await Booking.create({
            customer: customer1._id,
            vehicle: vehicle2._id,
            serviceCenter: center2._id,
            serviceType: 'brake_repair',
            scheduledDate: new Date('2026-02-18'),
            scheduledTime: '14:00',
            status: 'confirmed',
            estimatedCost: 3499
        });

        const booking5 = await Booking.create({
            customer: customer2._id,
            vehicle: vehicle3._id,
            serviceCenter: center1._id,
            serviceType: 'ac_service',
            scheduledDate: new Date('2026-02-10'),
            scheduledTime: '10:00',
            status: 'delivered',
            estimatedCost: 1999,
            actualCost: 2199,
            isPaid: true
        });

        // Create Payments
        await Payment.create({
            booking: booking1._id,
            customer: customer1._id,
            amount: 2799,
            stripePaymentIntentId: 'pi_demo_seed_001',
            status: 'completed'
        });

        await Payment.create({
            booking: booking5._id,
            customer: customer2._id,
            amount: 2199,
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
