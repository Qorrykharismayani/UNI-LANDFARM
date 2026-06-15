import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function runTest() {
  console.log('=== STARTING AUTOMATED AUTH FLOW DATABASE TESTING ===');
  
  const testEmail = `tester_${Date.now()}@unilanfarm.com`;
  const testPassword = 'securepassword123';
  const testName = 'Test User Programmatic';

  try {
    // 1. REGISTER TEST
    console.log('\n[1/5] Testing Registration Flow...');
    
    // Check if exists
    const checkEmail = await prisma.user.findUnique({ where: { email: testEmail } });
    if (checkEmail) {
      throw new Error('Test email already exists. Run again.');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    
    // Create user
    const newUser = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        password: hashedPassword,
        role: 'USER',
        status: 'Aktif',
        provider: 'credentials'
      }
    });
    
    console.log(`✅ Success: User created in Supabase with ID: ${newUser.id}`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   Provider: ${newUser.provider}`);
    console.log(`   Bcrypt Hash: ${newUser.password}`);

    // Verify email uniqueness check
    console.log('\n[2/5] Testing Unique Email Constraint...');
    try {
      await prisma.user.create({
        data: {
          name: 'Duplicate User',
          email: testEmail,
          password: hashedPassword,
          role: 'USER',
          status: 'Aktif'
        }
      });
      throw new Error('❌ Fail: Unique email constraint failed. Duplicate email allowed!');
    } catch (e: any) {
      if (e.code === 'P2002') {
        console.log('✅ Success: Unique email constraint successfully enforced by database (P2002).');
      } else {
        throw e;
      }
    }

    // 2. LOGIN TEST
    console.log('\n[3/5] Testing Credentials Login Flow...');
    const userForLogin = await prisma.user.findUnique({ where: { email: testEmail } });
    if (!userForLogin || !userForLogin.password) {
      throw new Error('❌ Fail: User not found in database for login.');
    }

    const isMatch = await bcrypt.compare(testPassword, userForLogin.password);
    if (isMatch) {
      console.log('✅ Success: Bcrypt password compared and matched perfectly.');
      console.log(`   Redirect Target: ${userForLogin.role === 'ADMIN' ? 'Dashboard Admin' : 'Dashboard User'}`);
    } else {
      throw new Error('❌ Fail: Password comparison failed.');
    }

    // 3. FORGOT PASSWORD TEST
    console.log('\n[4/5] Testing Forgot & Reset Password Flow...');
    
    // Request Token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 60 * 60 * 1000);
    
    const updatedUserToken = await prisma.user.update({
      where: { email: testEmail },
      data: {
        resetToken,
        resetTokenExpiry: expiry
      }
    });
    
    console.log(`✅ Success: Reset token saved to database.`);
    console.log(`   Token: ${updatedUserToken.resetToken}`);
    console.log(`   Expiry: ${updatedUserToken.resetTokenExpiry}`);

    // Reset Password
    const verifyUser = await prisma.user.findFirst({
      where: {
        email: testEmail,
        resetToken
      }
    });

    if (!verifyUser || (verifyUser.resetTokenExpiry && verifyUser.resetTokenExpiry < new Date())) {
      throw new Error('❌ Fail: Reset token verification failed or expired.');
    }

    const newHashedPassword = await bcrypt.hash('newsecurepassword456', 10);
    const completedResetUser = await prisma.user.update({
      where: { id: verifyUser.id },
      data: {
        password: newHashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    console.log('✅ Success: Password reset successfully applied in database.');
    console.log(`   New Password Bcrypt Hash: ${completedResetUser.password}`);
    console.log(`   Token Cleared (Expected null): ${completedResetUser.resetToken}`);
    console.log(`   Expiry Cleared (Expected null): ${completedResetUser.resetTokenExpiry}`);

    // 4. GOOGLE OAUTH SIMULATION TEST
    console.log('\n[5/5] Testing Google OAuth Flow...');
    const googleEmail = `google_tester_${Date.now()}@gmail.com`;
    const googleName = 'Google Account Owner';

    // Simulate first time OAuth login (User doesn't exist)
    const newGoogleUser = await prisma.user.create({
      data: {
        name: googleName,
        email: googleEmail,
        role: 'USER',
        status: 'Aktif',
        provider: 'google'
      }
    });

    console.log(`✅ Success: Simulated Google user auto-created in Supabase.`);
    console.log(`   ID: ${newGoogleUser.id}`);
    console.log(`   Email: ${newGoogleUser.email}`);
    console.log(`   Provider: ${newGoogleUser.provider}`);
    console.log(`   Password Field (Expected null): ${newGoogleUser.password}`);

    // Clean up test data
    console.log('\nCleaning up test accounts...');
    await prisma.user.delete({ where: { email: testEmail } });
    await prisma.user.delete({ where: { email: googleEmail } });
    console.log('✅ Cleanup complete.');

    console.log('\n=== ALL DATABASE AUTHENTICATION FLOW TESTS PASSED SUCCESSFULLY! ===');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
