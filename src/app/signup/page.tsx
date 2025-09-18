import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';
import { AppLogo } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                <AppLogo className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Viaje</h1>
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Start planning your next adventure today.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
