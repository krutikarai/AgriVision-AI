import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input, Alert } from '../../components/ui';
import { Sprout, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      setIsLoading(true);
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(`Reset instructions have been sent to ${email}. Please check your inbox.`);
    } catch (err: any) {
      setError('Could not process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Branding header */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-forest-50 rounded-2xl mb-3 border border-forest-100">
            <Sprout className="h-8 w-8 text-forest-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reset Password</h2>
          <p className="text-sm text-slate-500 mt-1">Get back into your AgriVision workspace</p>
        </div>

        <Card className="shadow-xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>Enter your email and we'll send you recovery steps.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <Alert variant="error" title="Request Failed">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" title="Email Sent">
                  {success}
                </Alert>
              )}

              {!success && (
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="farmer@agrivision.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              {!success ? (
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Send Recovery Link
                </Button>
              ) : (
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              )}
              
              {!success && (
                <Link to="/login" className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1.5 justify-center mt-2">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Sign In
                </Link>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
