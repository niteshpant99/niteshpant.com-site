'use client';
import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { AlertCircle } from 'lucide-react';

const MONTHLY_COSTS = 29780.51;
const INCLUDED_CASES = 200;
const BREAK_EVEN_THRESHOLD = 1000;
const MIN_BASE_FEE = 0;
const MIN_OVERAGE_FEE = 0;

const PractitionerPricingMatrix = () => {
  const [baseFee, setBaseFee] = useState(150);
  const [overageFee, setOverageFee] = useState(2);
  const [maxCases, setMaxCases] = useState(400);

  const practitioners = useMemo(() => 
    Array.from({length: 20}, (_, i) => 10 + (i * 10)), 
  []);

  const additionalCases = useMemo(() => 
    Array.from({length: 9}, (_, i) => i * 25), 
  []);

  const validateInput = (value, min = 0) => {
    const num = Number(value);
    return !isNaN(num) ? Math.max(num, min) : min;
  };

  const handleBaseFeeChange = (e) => {
    setBaseFee(validateInput(e.target.value, MIN_BASE_FEE));
  };

  const handleOverageFeeChange = (e) => {
    setOverageFee(validateInput(e.target.value, MIN_OVERAGE_FEE));
  };

  const handleMaxCasesChange = (e) => {
    setMaxCases(validateInput(e.target.value, INCLUDED_CASES));
  };

  const calculateRevenue = (numPractitioners, extraCasesPerPractitioner) => {
    const totalCases = INCLUDED_CASES + extraCasesPerPractitioner;
    const baseRevenue = numPractitioners * baseFee;
    const overageRevenue = numPractitioners * extraCasesPerPractitioner * overageFee;
    const totalRevenue = baseRevenue + overageRevenue;
    
    return {
      revenue: totalRevenue,
      exceedsLimit: totalCases > maxCases,
      monthlyRevenuePerPractitioner: totalRevenue / numPractitioners,
      totalCases,
      baseRevenue,
      overageRevenue
    };
  };

  const revenueMatrix = useMemo(() => {
    return practitioners.map(practitioner => ({
      practitioner,
      revenues: additionalCases.map(cases => calculateRevenue(practitioner, cases))
    }));
  }, [practitioners, additionalCases, baseFee, overageFee, maxCases]);

  const getRevenueColor = (data) => {
    const { revenue, exceedsLimit } = data;
    
    if (exceedsLimit) {
      return 'bg-amber-100 dark:bg-amber-900/50';
    }
    
    const profitability = revenue - MONTHLY_COSTS;
    
    if (Math.abs(profitability) < BREAK_EVEN_THRESHOLD) {
      return 'bg-blue-100 dark:bg-blue-900/50';
    }
    
    if (profitability >= 0) {
      // Further categorize profitable scenarios
      if (profitability > MONTHLY_COSTS * 0.5) {
        return 'bg-green-300 dark:bg-green-800/50'; // Highly profitable
      }
      return 'bg-green-100 dark:bg-green-900/50'; // Profitable
    }
    
    // Further categorize unprofitable scenarios
    if (profitability < -MONTHLY_COSTS * 0.5) {
      return 'bg-red-300 dark:bg-red-800/50'; // Highly unprofitable
    }
    return 'bg-red-100 dark:bg-red-900/50'; // Unprofitable
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
    <Card className="w-full border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-foreground">
          Hercules Practitioner-Based Pricing Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 min-w-[900px]">
        <div className="w-full">
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="baseFee" className="text-foreground">
                Base Subscription Fee ($)
              </Label>
              <Input
                id="baseFee"
                type="number"
                value={baseFee}
                onChange={handleBaseFeeChange}
                min={MIN_BASE_FEE}
                step="10"
                className="w-full"
                aria-label="Base subscription fee per practitioner"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="overageFee" className="text-foreground">
                Overage Fee per Case ($)
              </Label>
              <Input
                id="overageFee"
                type="number"
                value={overageFee}
                onChange={handleOverageFeeChange}
                min={MIN_OVERAGE_FEE}
                step="0.5"
                className="w-full"
                aria-label="Fee per case over included amount"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="maxCases" className="text-foreground">
                Max Cases per Practitioner
              </Label>
              <Input
                id="maxCases"
                type="number"
                value={maxCases}
                onChange={handleMaxCasesChange}
                min={INCLUDED_CASES}
                step="50"
                className="w-full"
                aria-label="Maximum allowed cases per practitioner"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse" role="grid" aria-label="Revenue matrix">
              <thead>
                <tr>
                  <th scope="col" className="p-2 border text-left bg-background">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground">Practitioners</span>
                      <span className="text-xs text-muted-foreground">
                        (Base: {INCLUDED_CASES} cases)
                      </span>
                    </div>
                  </th>
                  {additionalCases.map(cases => (
                    <th 
                      key={cases} 
                      scope="col"
                      className="p-2 border text-center whitespace-nowrap bg-background"
                    >
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
                {revenueMatrix.map(({ practitioner, revenues }) => (
                  <tr key={practitioner}>
                    <th 
                      scope="row" 
                      className="p-2 border font-medium bg-background text-foreground"
                    >
                      {practitioner}
                    </th>
                    {revenues.map((revenueData, index) => (
                      <td
                        key={`${practitioner}-${index}`}
                        className={`p-2 border text-center ${getRevenueColor(revenueData)}`}
                        role="cell"
                        aria-label={`Revenue for ${practitioner} practitioners with ${revenueData.totalCases} total cases: ${formatRevenue(revenueData.revenue)}`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-foreground">
                            {formatRevenue(revenueData.revenue)}
                          </span>
                          {revenueData.exceedsLimit && (
                            <AlertCircle 
                              className="h-4 w-4 text-amber-600 dark:text-amber-400" 
                              aria-label="Exceeds maximum cases limit"
                            />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>* Each practitioner includes {INCLUDED_CASES} cases/month in base subscription</p>
            <p>* Dark green: Highly profitable ({'>'}50% above break-even)</p>
            <p>* Light green: Profitable (above break-even)</p>
            <p>* Blue: Near break-even (±{formatRevenue(BREAK_EVEN_THRESHOLD)})</p>
            <p>* Light red: Unprofitable (below break-even)</p>
            <p>* Dark red: Highly unprofitable ({'>'}50% below break-even)</p>
            <p>* Yellow cells with ⚠️ exceed maximum allowed cases per practitioner ({maxCases})</p>
            <p>Break-even point: {formatRevenue(MONTHLY_COSTS)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PractitionerPricingMatrix;