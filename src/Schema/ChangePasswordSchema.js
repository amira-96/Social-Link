import * as zod from 'zod';

export const ChangePasswordSchema = zod.object({

     password:zod.string()
      .nonempty('Password is required')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be Minimum eight characters, at least one letter, one number and one special character"),
 
    newPassword: zod.string()
        .nonempty('New password is required')
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
               "Password must be a minimum of eight characters, with at least one letter, one number, and one special character"),
});