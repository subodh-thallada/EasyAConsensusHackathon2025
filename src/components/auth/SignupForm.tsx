
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to AptosTradeFlow. Let's set up your preferences.",
      });
      // Redirect to onboarding would happen here
      window.location.href = '/onboarding';
    }, 1500);
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-aptos-primary hover:bg-aptos-secondary">
              {isLoading ? "Creating Account..." : "Sign Up"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Button variant="outline" type="button" disabled={isLoading}>
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="wallet"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M458.6 127.2c0-21.76-17.64-39.36-39.36-39.36H92.76C70.96 87.84 53.36 105.44 53.36 127.2H458.6zM458.6 202.72H53.36v190.08c0 21.76 17.64 39.36 39.4 39.36h326.44c21.72 0 39.36-17.6 39.36-39.36l.04-190.08zM380.04 317.76c0 21.8-17.68 39.44-39.44 39.44c-21.8 0-39.44-17.64-39.44-39.44c0-21.76 17.68-39.4 39.44-39.4c21.76 0 39.44 17.64 39.44 39.4"
              ></path>
            </svg>
            Connect Wallet
          </Button>
        </div>
      </div>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-aptos-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
