import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input, Alert } from '../components/ui';
import { User as UserIcon, MapPin, Calendar, Sprout, CheckCircle } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [farmSize, setFarmSize] = useState(user?.farmSize || '');
  const [location, setLocation] = useState(user?.location || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!fullName) {
      setError('Full Name is required.');
      return;
    }

    try {
      setIsLoading(true);
      const success = await updateProfile(fullName, farmSize, location);
      if (success) {
        setSuccess(true);
      } else {
        setError('Could not update profile. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Profile update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left side card: Profile Overview */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="text-center flex flex-col items-center p-6">
          <img
            src={user?.avatarUrl}
            alt={user?.fullName}
            className="h-24 w-24 rounded-full border-2 border-forest-500 bg-forest-50 object-cover shadow-md mb-4"
          />
          <h3 className="text-lg font-black text-slate-800 leading-tight">{user?.fullName}</h3>
          <span className="text-xs text-slate-400 font-bold block mt-1">{user?.email}</span>

          <div className="w-full border-t border-slate-50 mt-6 pt-5 space-y-3.5 text-xs text-left font-semibold text-slate-600">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <span>Joined: {user?.joinedDate}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sprout className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <span>Farm size: {user?.farmSize || 'Not set'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <span>Location: {user?.location || 'Not set'}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Right side form: Update details */}
      <div className="lg:col-span-8">
        <Card className="shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-slate-50 pb-4 mb-4">
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information and farm coordinates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {error && (
                <Alert variant="error" title="Update Failed">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" title="Success">
                  Your profile details have been successfully updated.
                </Alert>
              )}

              <Input
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setSuccess(false);
                }}
                required
              />

              <Input
                label="Farm Size (Acreage)"
                type="text"
                placeholder="e.g. 25 Acres"
                value={farmSize}
                onChange={(e) => {
                  setFarmSize(e.target.value);
                  setSuccess(false);
                }}
              />

              <Input
                label="Location (Region / State)"
                type="text"
                placeholder="e.g. California, USA"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setSuccess(false);
                }}
              />

              <div className="space-y-1 pl-1">
                <label className="text-sm font-semibold text-slate-400">Account Email (Unchangeable)</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-400 text-sm rounded-xl outline-none cursor-not-allowed"
                  disabled
                />
              </div>

            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full sm:w-auto font-bold" isLoading={isLoading}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

    </div>
  );
};
