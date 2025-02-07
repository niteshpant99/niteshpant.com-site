'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { AlertCircle } from 'lucide-react';

const PractitionerPricingMatrix = () => {
  const MONTHLY_COSTS = 29780.51;
  const INCLUDED_CASES = 200;

  const RevenueMatrix = () => {
    const [baseFee, setBaseFee] = useState(150);
    const [overageFee, setOverageFee] = useState(2);
    const [maxCases, setMaxCases] = useState(400);

    const practitioners = Array.from({length: 20}, (_, i) => 10 + (i * 10));
    const additionalCases = Array.from({length: 9}, (_, i) => i * 25);

    const calculateRevenue = (numPractitioners, extraCasesPerPractitioner) => {
      const totalCases = INCLUDED_CASES + extraCasesPerPractitioner;
      const baseRevenue = numPractitioners * baseFee;
      const overageRevenue = numPractitioners * extraCasesPerPractitioner * overageFee;
      return { 
        revenue: baseRevenue + overageRevenue,
        exceedsLimit: totalCases > maxCases
      };
    };

    const getRevenueColor = (revenue, exceedsLimit) => {
      if (exceedsLimit) return 'bg-amber-100 dark:bg-amber-900/50';
      if (Math.abs(revenue - MONTHLY_COSTS) < 1000) return 'bg-blue-100 dark:bg-blue-900/50';
      return revenue >= MONTHLY_COSTS ? 
        'bg-green-100 dark:bg-green-900/50' : 
        'bg-red-100 dark:bg-red-900/50';
    };

    const formatRevenue = (revenue) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(revenue);
    };

    return (
        <div className="w-full">
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-foreground">Base Subscription Fee ($)</Label>
              <Input
                type="number"
                value={baseFee}
                onChange={(e) => setBaseFee(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label className="text-foreground">Overage Fee per Case ($)</Label>
              <Input
                type="number"
                value={overageFee}
                onChange={(e) => setOverageFee(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label className="text-foreground">Max Cases per Practitioner</Label>
              <Input
                type="number"
                value={maxCases}
                onChange={(e) => setMaxCases(Number(e.target.value))}
                className="w-full"
              />
            </div>
          
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border text-left bg-background">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">Practitioners</span>
                    <span className="text-xs text-muted-foreground">
                      (Base: {INCLUDED_CASES} cases)
                    </span>
                  </div>
                </th>
                {additionalCases.map(cases => (
                  <th key={cases} className="p-2 border text-center whitespace-nowrap bg-background">
                    <div className="flex flex-col">
                      <span className="text-foreground">+{cases} cases</span>
                      <span className="text-xs text-muted-foreground">
                        (Total: {INCLUDED_CASES + cases})
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {practitioners.map(practitioner => (
                <tr key={practitioner}>
                  <td className="p-2 border font-medium bg-background text-foreground">{practitioner}</td>
                  {additionalCases.map(cases => {
                    const { revenue, exceedsLimit } = calculateRevenue(practitioner, cases);
                    return (
                      <td
                        key={`${practitioner}-${cases}`}
                        className={`p-2 border text-center ${getRevenueColor(revenue, exceedsLimit)}`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-foreground">{formatRevenue(revenue)}</span>
                          {exceedsLimit && (
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>* Each practitioner includes {INCLUDED_CASES} cases/month in base subscription</p>
          <p>* Green cells indicate revenue above break-even ({formatRevenue(MONTHLY_COSTS)})</p>
          <p>* Blue cells indicate near break-even (±$1,000)</p>
          <p>* Yellow cells with ⚠️ exceed maximum allowed cases per practitioner ({maxCases})</p>
          <p>* Additional cases shown are per practitioner per month</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-foreground">Hercules Practitioner-Based Pricing Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-0 min-w-[900px]">
        <RevenueMatrix />
      </CardContent>
    </Card>
  );
};

export default PractitionerPricingMatrix;