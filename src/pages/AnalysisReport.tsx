
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, ArrowLeft, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import type { AnalysisReport as AnalysisReportType } from '@/types/vehicle';
import { getMockAnalysisReport } from '@/lib/mock-data';
import VehicleImageViewer from '@/components/vehicle-analyzer/VehicleImageViewer';
import PriceChart from '@/components/vehicle-analyzer/PriceChart';
import LegalInfoCard from '@/components/vehicle-analyzer/LegalInfoCard';
import VehicleIssuesCard from '@/components/vehicle-analyzer/VehicleIssuesCard';

const AnalysisReport = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<AnalysisReportType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we're using mock data
    setTimeout(() => {
      setReport(getMockAnalysisReport());
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleDownloadPDF = () => {
    toast.success('Report downloaded successfully');
  };

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center py-16">
        <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-4xl">
          <div className="h-8 bg-muted rounded-md w-1/3"></div>
          <div className="h-4 bg-muted rounded-md w-1/2"></div>
          <div className="h-64 bg-muted rounded-lg w-full mt-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            <div className="h-40 bg-muted rounded-lg"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
        <p className="text-muted-foreground mb-8">The analysis report you're looking for doesn't exist or was deleted.</p>
        <Button asChild>
          <Link to="/vehicle-analyzer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Analyzer
          </Link>
        </Button>
      </div>
    );
  }

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (report.visualScore * 0.4) +
    (report.legalScore * 0.4) +
    ((report.marketValue.suggested / report.marketValue.max) * 100 * 0.2)
  );

  let recommendation = "Not Recommended";
  let recommendationColor = "text-destructive";
  
  if (overallScore >= 80) {
    recommendation = "Highly Recommended";
    recommendationColor = "text-green-600";
  } else if (overallScore >= 60) {
    recommendation = "Recommended";
    recommendationColor = "text-amber-600";
  } else if (overallScore >= 40) {
    recommendation = "Acceptable with Repairs";
    recommendationColor = "text-orange-600";
  }

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/vehicle-analyzer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Analyzer
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {report.vehicleDetails.make} {report.vehicleDetails.model} ({report.vehicleDetails.year})
          </h1>
          <p className="text-muted-foreground">
            Analysis Report • {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ScoreCard 
            title="Visual Condition" 
            score={report.visualScore} 
            icon={<Info className="h-5 w-5" />} 
            description="Based on AI image analysis" 
          />
          <ScoreCard 
            title="Legal Status" 
            score={report.legalScore} 
            icon={<AlertTriangle className="h-5 w-5" />}
            description="Based on historical records" 
          />
          <ScoreCard 
            title="Overall Rating" 
            score={overallScore} 
            icon={<CheckCircle className="h-5 w-5" />}
            description={<span className={`font-semibold ${recommendationColor}`}>{recommendation}</span>} 
            highlight
          />
        </motion.div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="legal">Legal Info</TabsTrigger>
            <TabsTrigger value="issues">Issues Found</TabsTrigger>
          </TabsList>
          
          <TabsContent value="images">
            <VehicleImageViewer images={report.images} />
          </TabsContent>
          
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Price Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <PriceChart report={report} />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Suggested Price</h3>
                      <div className="text-3xl font-bold text-primary">
                        ₹{report.suggestedPrice.toLocaleString()}
                      </div>
                      {report.vehicleDetails.sellerPrice && (
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground mr-2">Seller's Quote:</span>
                          <span className="font-medium">₹{parseInt(report.vehicleDetails.sellerPrice).toLocaleString()}</span>
                          
                          {parseInt(report.vehicleDetails.sellerPrice) > report.suggestedPrice ? (
                            <Badge variant="destructive" className="ml-2">
                              Overpriced by ₹{(parseInt(report.vehicleDetails.sellerPrice) - report.suggestedPrice).toLocaleString()}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                              Good Deal
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Price Breakdown</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Market Low</dt>
                          <dd className="font-medium">₹{report.marketValue.min.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Market High</dt>
                          <dd className="font-medium">₹{report.marketValue.max.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Dealer Average</dt>
                          <dd className="font-medium">₹{report.marketValue.dealerAvg.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Direct Sell Average</dt>
                          <dd className="font-medium">₹{report.marketValue.directSellAvg.toLocaleString()}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg border">
                      <h4 className="font-medium mb-1">Bargaining Tip</h4>
                      <p className="text-sm">
                        {report.vehicleDetails.sellerPrice && parseInt(report.vehicleDetails.sellerPrice) > report.suggestedPrice 
                          ? `The vehicle is overpriced by about ${((parseInt(report.vehicleDetails.sellerPrice) - report.suggestedPrice) / parseInt(report.vehicleDetails.sellerPrice) * 100).toFixed(1)}%. Consider negotiating by pointing out the visual condition issues.`
                          : `This is priced fairly based on market conditions. If negotiating, focus on the minor issues found during inspection.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="legal">
            <LegalInfoCard legalInfo={report.legalInfo} score={report.legalScore} />
          </TabsContent>
          
          <TabsContent value="issues">
            <VehicleIssuesCard issues={report.issues} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ScoreCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: React.ReactNode;
  highlight?: boolean;
}

const ScoreCard = ({ title, score, icon, description, highlight = false }: ScoreCardProps) => {
  let scoreColor = 'bg-red-600';
  
  if (score >= 80) {
    scoreColor = 'bg-green-600';
  } else if (score >= 60) {
    scoreColor = 'bg-amber-500';
  } else if (score >= 40) {
    scoreColor = 'bg-orange-500';
  }
  
  return (
    <Card className={highlight ? "border-primary bg-primary/5" : ""}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <div className="text-2xl font-bold">{score}/100</div>
        </div>
        <Progress value={score} className={`h-2 ${scoreColor}`} />
        <div className="mt-3 text-sm text-muted-foreground">
          {description}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisReport;
