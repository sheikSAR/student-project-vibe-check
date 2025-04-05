
export interface VehicleImage {
  id: string;
  url: string;
  annotations?: Array<{
    x: number;
    y: number;
    label: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: string;
  mileage: string;
  numberPlate: string;
  sellerPrice?: string;
  description?: string;
}

export interface LegalInfo {
  ownerName: string;
  registrationDate: string;
  insuranceValid: boolean;
  insuranceExpiry?: string;
  fines: Array<{
    date: string;
    amount: number;
    reason: string;
  }>;
  accidentHistory: boolean;
  stolenStatus: boolean;
}

export interface PriceEstimate {
  min: number;
  max: number;
  suggested: number;
  dealerAvg: number;
  directSellAvg: number;
}

export interface AnalysisReport {
  id: string;
  createdAt: string;
  vehicleDetails: VehicleDetails;
  images: VehicleImage[];
  visualScore: number;
  legalScore: number;
  marketValue: PriceEstimate;
  legalInfo: LegalInfo;
  issues: {
    exterior: string[];
    interior: string[];
    mechanical: string[];
    legal: string[];
  };
  suggestedPrice: number;
}
