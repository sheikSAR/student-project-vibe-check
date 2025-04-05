
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Tool, Car, Gavel } from 'lucide-react';

interface VehicleIssuesCardProps {
  issues: {
    exterior: string[];
    interior: string[];
    mechanical: string[];
    legal: string[];
  };
}

const VehicleIssuesCard: React.FC<VehicleIssuesCardProps> = ({ issues }) => {
  const totalIssues = 
    issues.exterior.length + 
    issues.interior.length +
    issues.mechanical.length +
    issues.legal.length;
    
  const issueCategories = [
    { 
      id: 'exterior',
      name: 'Exterior',
      icon: <Car className="h-4 w-4" />,
      items: issues.exterior,
      color: 'text-blue-500',
      listStyle: 'list-disc',
    },
    { 
      id: 'interior',
      name: 'Interior',
      icon: <Car className="h-4 w-4" />,
      items: issues.interior,
      color: 'text-purple-500',
      listStyle: 'list-disc',
    },
    { 
      id: 'mechanical',
      name: 'Mechanical',
      icon: <Tool className="h-4 w-4" />,
      items: issues.mechanical,
      color: 'text-amber-500',
      listStyle: 'list-square',
    },
    { 
      id: 'legal',
      name: 'Legal',
      icon: <Gavel className="h-4 w-4" />,
      items: issues.legal,
      color: 'text-red-500',
      listStyle: 'list-square',
    },
  ];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <div>Detected Issues</div>
          <div className="text-base font-normal">
            Total: <span className="font-bold">{totalIssues} issues</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {totalIssues === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Car className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Issues Detected!</h3>
            <p className="text-muted-foreground max-w-md">
              This vehicle appears to be in excellent condition with no visible issues detected in our analysis.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="exterior">
            <TabsList className="grid grid-cols-4 mb-4">
              {issueCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  disabled={category.items.length === 0}
                  className="flex gap-2 items-center"
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">
                    {category.items.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {issueCategories.map(category => (
              <TabsContent key={category.id} value={category.id}>
                {category.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <p className="text-muted-foreground">No {category.name.toLowerCase()} issues detected</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((issue, index) => (
                        <div 
                          key={index} 
                          className="flex gap-3 p-3 rounded-md bg-muted/50"
                        >
                          <AlertCircle className={`h-5 w-5 mt-0.5 shrink-0 ${category.color}`} />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                    
                    {category.id === 'exterior' && issues.exterior.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-1">Exterior Issues Impact</h4>
                        <p className="text-sm text-blue-700">
                          Exterior damages like scratches and dents primarily affect the vehicle's aesthetics and resale value, but usually don't impact functionality.
                        </p>
                      </div>
                    )}
                    
                    {category.id === 'mechanical' && issues.mechanical.length > 0 && (
                      <div className="mt-4 p-4 bg-amber-50 rounded-md border border-amber-100">
                        <h4 className="font-medium text-amber-800 mb-1">Important</h4>
                        <p className="text-sm text-amber-700">
                          Mechanical issues should be addressed promptly as they can affect vehicle safety and performance. Consider having a mechanic inspect these issues before purchasing.
                        </p>
                      </div>
                    )}
                    
                    {category.id === 'legal' && issues.legal.length > 0 && (
                      <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-100">
                        <h4 className="font-medium text-red-800 mb-1">Legal Warning</h4>
                        <p className="text-sm text-red-700">
                          Legal issues can prevent transfer of ownership or result in future complications. Resolve these before completing the purchase.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleIssuesCard;
