import fs from 'fs';

async function deleteAuthSessions() {
  const sessionPath = 'tmp/auth';

  console.log('🧹 Cleaning up auth sessions...');
  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
  }
}

export default deleteAuthSessions;