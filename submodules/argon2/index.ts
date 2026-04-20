import argon2 from 'argon2';

const leakedHash = '$argon2i$v=19$m=65536,t=4,p=1$OEM3a0dYRjdJejkwVmxKTg$2t3BfUlz9Y2JSs01UaINSC7P87DcYYwCzAjScHR229g-DShruiDu';
const passwordToTest = process.argv[2];

if (!passwordToTest) {
  console.log('Usage: node check-password.js <your_password>');
  process.exit(1);
}

try {
  const match = await argon2.verify(leakedHash, passwordToTest);

  if (match) {
    console.log('⚠️ MATCH: This password corresponds to the leaked hash.');
  }
  else {
    console.log('✅ No match: This is NOT the leaked password.');
  }
}
catch (err) {
  console.error('Error verifying password:', err);
}
