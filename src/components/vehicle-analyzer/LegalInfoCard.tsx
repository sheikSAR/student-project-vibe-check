
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LegalInfo } from '@/types/vehicle';
import { Shield, AlertCircle, Check, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LegalInfoCardProps {
  legalInfo: LegalInfo;
  score: number;
}

const LegalInfoCard: React.FC<LegalInfoCardProps> = ({ legalInfo, score }) => {
  const totalFinesAmount = legalInfo.fines.reduce((sum, fine) => sum + fine.amount, 0);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <div>Legal Information</div>
          <div className="flex items-center gap-2 text-base">
            <span>Legal Score:</span>
            <span className="font-bold">{score}/100</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {legalInfo.stolenStatus ? (
            <Alert variant="destructive" className="border-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Stolen Vehicle Alert</AlertTitle>
              <AlertDescription>
                This vehicle has been reported as stolen. Do not proceed with the purchase, and consider reporting to local authorities.
              </AlertDescription>
            </Alert>
          ) : null}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Registration Details</h3>
              <dl className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Registered Owner</dt>
                  <dd className="font-medium">{legalInfo.ownerName}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Registration Date</dt>
                  <dd className="font-medium">{legalInfo.registrationDate}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Insurance Status</dt>
                  <dd className="font-medium flex items-center">
                    {legalInfo.insuranceValid ? (
                      <><Check size={16} className="text-green-600 mr-1" /> Valid</>
                    ) : (
                      <><X size={16} className="text-red-600 mr-1" /> Expired</>
                    )}
                  </dd>
                </div>
                {legalInfo.insuranceValid && legalInfo.insuranceExpiry && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">Insurance Expiry</dt>
                    <dd className="font-medium">{legalInfo.insuranceExpiry}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Accident History</dt>
                  <dd className="font-medium flex items-center">
                    {legalInfo.accidentHistory ? (
                      <><AlertCircle size={16} className="text-amber-600 mr-1" /> Yes</>
                    ) : (
                      <><Check size={16} className="text-green-600 mr-1" /> None</>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Stolen Status</dt>
                  <dd className="font-medium flex items-center">
                    {legalInfo.stolenStatus ? (
                      <><AlertCircle size={16} className="text-red-600 mr-1" /> Reported Stolen</>
                    ) : (
                      <><Check size={16} className="text-green-600 mr-1" /> Clear</>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Fine History</h3>
              
              {legalInfo.fines.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-2 py-8">
                  <Shield className="h-10 w-10 text-green-600" />
                  <p className="font-medium">No fines or tickets found</p>
                  <p className="text-sm text-muted-foreground">This vehicle has a clean record</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Fines</span>
                    <span className="font-semibold">₹{totalFinesAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                    {legalInfo.fines.map((fine, index) => (
                      <div 
                        key={index}
                        className="bg-muted rounded-md p-3 border-l-2 border-amber-500"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{fine.reason}</span>
                          <span className="text-sm font-semibold">₹{fine.amount.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Date: {fine.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Legal Compliance Score</span>
                  <span className="font-semibold">{score}/100</span>
                </div>
                <Progress value={score} className={`h-2 ${
                  score >= 80 ? 'bg-green-600' :
                  score >= 60 ? 'bg-amber-500' :
                  score >= 40 ? 'bg-orange-500' : 'bg-red-600'
                }`} />
                <p className="text-sm text-muted-foreground mt-2">
                  {score >= 80 ? 'Excellent legal status with minimal issues' :
                  score >= 60 ? 'Good legal status with some minor issues' :
                  score >= 40 ? 'Several legal issues that should be addressed' :
                  'Significant legal problems that require attention'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalInfoCard;
