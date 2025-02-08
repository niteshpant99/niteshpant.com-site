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

const PricingSimulator = () => {
  // Core pricing parameters
  const [baseFee, setBaseFee] = useState(150);
  const [overageFee, setOverageFee] = useState(2);
  const [includedCases, setIncludedCases] = useState(INCLUDED_CASES);
  const [maxCases, setMaxCases] = useState(400);

  // Generate practitioner range (10 to 200 in steps of 10)
  const practitioners = useMemo(() => 
    Array.from({length: 20}, (_, i) => 10 + (i * 10)), 
  []);

  // Generate additional cases range (0 to 200 in steps of 25)
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

  const handleIncludedCasesChange = (e) => {
    setIncludedCases(validateInput(e.target.value, 0));
  };

  const handleMaxCasesChange = (e) => {
    setMaxCases(validateInput(e.target.value, includedCases));
  };

  // Calculate revenue for a given scenario
  const calculateRevenue = (numPractitioners, extraCasesPerPractitioner) => {
    const totalCases = includedCases + extraCasesPerPractitioner;
    const baseRevenue = numPractitioners * baseFee;
    const overageRevenue = numPractitioners * extraCasesPerPractitioner * overageFee;
    const totalRevenue = baseRevenue + overageRevenue;
    
    return {
      revenue: totalRevenue,
      exceedsLimit: totalCases > maxCases,
      monthlyRevenuePerPractitioner: totalRevenue / numPractitioners,
      totalCases,
      baseRevenue,
      overageRevenue,
      profitMargin: ((totalRevenue - MONTHLY_COSTS) / totalRevenue) * 100
    };
  };

  // Generate the revenue matrix
  const revenueMatrix = useMemo(() => {
    return practitioners.map(practitioner => ({
      practitioner,
      revenues: additionalCases.map(cases => calculateRevenue(practitioner, cases))
    }));
  }, [practitioners, additionalCases, baseFee, overageFee, maxCases, includedCases]);

  // Determine cell color based on profitability
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
      if (profitability > MONTHLY_COSTS * 0.5) {
        return 'bg-green-300 dark:bg-green-800/50';
      }
      return 'bg-green-100 dark:bg-green-900/50';
    }
    
    if (profitability < -MONTHLY_COSTS * 0.5) {
      return 'bg-red-300 dark:bg-red-800/50';
    }
    return 'bg-red-100 dark:bg-red-900/50';
  };

  const formatRevenue = (revenue) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(revenue);
  };

  const formatPercentage = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-xl text-foreground">
          Hercules Pricing Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="flex p-0 min-w-[1100px] w-full justify-center items-center">
        <div className="w-full">
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="baseFee" className="text-foreground">
                Base Monthly Fee ($)
              </Label>
              <Input
                id="baseFee"
                type="number"
                value={baseFee}
                onChange={handleBaseFeeChange}
                min={MIN_BASE_FEE}
                step="10"
                className="w-full"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="overageFee" className="text-foreground">
                Additional Case Fee ($)
              </Label>
              <Input
                id="overageFee"
                type="number"
                value={overageFee}
                onChange={handleOverageFeeChange}
                min={MIN_OVERAGE_FEE}
                step="0.5"
                className="w-full"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="includedCases" className="text-foreground">
                Included Cases
              </Label>
              <Input
                id="includedCases"
                type="number"
                value={includedCases}
                onChange={handleIncludedCasesChange}
                min={0}
                step="25"
                className="w-full"
              />
            </div>
            
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse" role="grid">
              <thead>
                <tr>
                  <th scope="col" className="p-2 border text-left bg-background whitespace-nowrap">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-foreground">Practitioners</span>
                      <span className="text-xs text-muted-foreground">
                        (Base: {includedCases} cases)
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
                          (Total: {includedCases + cases})
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
                      >
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="font-medium text-foreground">
                            {formatRevenue(revenueData.revenue)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatPercentage(revenueData.profitMargin)} margin
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

          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p>* Break-even point: {formatRevenue(MONTHLY_COSTS)}</p>
            <p>* Dark green: Highly profitable ({'>'}50% above break-even)</p>
            <p>* Light green: Profitable (above break-even)</p>
            <p>* Blue: Near break-even (±{formatRevenue(BREAK_EVEN_THRESHOLD)})</p>
            <p>* Light red: Unprofitable (below break-even)</p>
            <p>* Dark red: Highly unprofitable ({'>'}50% below break-even)</p>
            <p>* Yellow cells with warning icon exceed maximum allowed cases ({maxCases})</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSimulator;