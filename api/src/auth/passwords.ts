import { randomBytes, createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';

const prisma = new PrismaClient();

export async function createResetToken(userId: string) {
  // random hex codes
  const resetToken = randomBytes(40).toString('hex');

  //hash the  random hex codes
  const hashedResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // reset is only valid for 10 minues
  const passwordChangedAt = dayjs().toDate();
  const passwordResetTokenExiresAt = dayjs().add(2, 'minutes').toDate();

  // update the user
  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordChangedAt,
      passwordResetTokenExiresAt,
      passwordResetToken: hashedResetToken,
    },
  });

  return { resetToken };
}
