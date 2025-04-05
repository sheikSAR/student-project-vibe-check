
import { AnalysisReport } from '@/types/vehicle';

export const getMockAnalysisReport = (): AnalysisReport => {
  return {
    id: 'demo-123',
    createdAt: new Date().toISOString(),
    vehicleDetails: {
      make: 'Honda',
      model: 'City',
      year: '2019',
      mileage: '45000',
      numberPlate: 'MH02AB1234',
      sellerPrice: '650000',
      description: 'Single owner vehicle with all service records.',
    },
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1024',
        annotations: [
          {
            x: 25,
            y: 35,
            label: 'Minor scratch on front bumper',
            severity: 'low',
          },
          {
            x: 80,
            y: 45,
            label: 'Small dent on right fender',
            severity: 'medium',
          }
        ],
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=1024',
        annotations: [
          {
            x: 65,
            y: 55,
            label: 'Headlight foggy and needs cleaning',
            severity: 'low',
          }
        ],
      },
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=1024',
        annotations: [],
      },
      {
        id: 'img4',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1024',
        annotations: [
          {
            x: 45,
            y: 60,
            label: 'Dashboard warning light visible',
            severity: 'high',
          }
        ],
      },
      {
        id: 'img5',
        url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1024',
        annotations: [],
      },
    ],
    visualScore: 78,
    legalScore: 85,
    marketValue: {
      min: 580000,
      max: 720000,
      suggested: 620000,
      dealerAvg: 680000,
      directSellAvg: 600000,
    },
    legalInfo: {
      ownerName: 'Rahul Sharma',
      registrationDate: '15/05/2019',
      insuranceValid: true,
      insuranceExpiry: '23/09/2024',
      fines: [
        {
          date: '12/03/2023',
          amount: 2000,
          reason: 'Parking violation'
        },
        {
          date: '05/08/2022',
          amount: 1500,
          reason: 'Speeding (15 km/h over limit)'
        }
      ],
      accidentHistory: false,
      stolenStatus: false
    },
    issues: {
      exterior: [
        'Minor scratch on front bumper',
        'Small dent on right fender',
        'Headlight foggy and needs cleaning',
        'Slight paint fading on roof'
      ],
      interior: [
        'Minor wear on driver seat',
        'Small tear on rear seat upholstery'
      ],
      mechanical: [
        'Dashboard warning light visible - check engine',
        'Brake pads need replacement soon'
      ],
      legal: []
    },
    suggestedPrice: 620000,
  };
};
