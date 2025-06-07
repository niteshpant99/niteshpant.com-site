// app/work/hercules/page.tsx
'use client';
import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Switch } from '../../../components/ui/switch';
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MONTHLY_COSTS = 29780.51;
const MIN_PRACTITIONERS = 10;
const MAX_PRACTITIONERS = 200;
const STEP_PRACTITIONERS = 10;
const MIN_CASES = 0;
const MAX_ADDITIONAL_CASES = 200;
const STEP_CASES = 25;

interface PricingConfig {
  baseFee: number;
  caseRate: number;
  minimumCases: number;
  usePractitionerFee: boolean;
}

interface SimulationResult {
  totalRevenue: number;
  baseRevenue: number;
  overageRevenue: number;
  margin: number;
  averageRevenuePerCase: number;
  breaksEven: boolean;
  profitability: 'high-loss' | 'loss' | 'breakeven' | 'profit' | 'high-profit';
}

const PricingSimulator = () => {
  const [config, setConfig] = useState<PricingConfig>({
    baseFee: 150,
    caseRate: 2,
    minimumCases: 200,
    usePractitionerFee: true
  });

  const [activeView, setActiveView] = useState('matrix');

  // Generate ranges for practitioners and cases
  const practitioners = useMemo(() => 
    Array.from(
      { length: (MAX_PRACTITIONERS - MIN_PRACTITIONERS) / STEP_PRACTITIONERS + 1 },
      (_, i) => MIN_PRACTITIONERS + (i * STEP_PRACTITIONERS)
    ),
    []
  );

  const additionalCases = useMemo(() =>
    Array.from(
      { length: (MAX_ADDITIONAL_CASES - MIN_CASES) / STEP_CASES + 1 },
      (_, i) => MIN_CASES + (i * STEP_CASES)
    ),
    []
  );

  // Calculate revenue for a given scenario
  const calculateRevenue = (numPractitioners: number, extraCasesPerPractitioner: number): SimulationResult => {
    const totalCases = numPractitioners * (config.minimumCases + extraCasesPerPractitioner);
    
    let baseRevenue = 0;
    if (config.usePractitionerFee) {
      baseRevenue = numPractitioners * config.baseFee;
    }
    
    const caseRevenue = totalCases * config.caseRate;
    const totalRevenue = baseRevenue + caseRevenue;
    const margin = ((totalRevenue - MONTHLY_COSTS) / totalRevenue) * 100;
    
    const profitability = (() => {
      const profit = totalRevenue - MONTHLY_COSTS;
      if (profit < -MONTHLY_COSTS * 0.5) return 'high-loss';
      if (profit < 0) return 'loss';
      if (Math.abs(profit) < 1000) return 'breakeven';
      if (profit > MONTHLY_COSTS * 0.5) return 'high-profit';
      return 'profit';
    })();

    return {
      totalRevenue,
      baseRevenue,
      overageRevenue: caseRevenue,
      margin,
      averageRevenuePerCase: totalRevenue / totalCases,
      breaksEven: totalRevenue >= MONTHLY_COSTS,
      profitability
    };
  };

  // Generate data for matrix view
  const matrixData = useMemo(() => 
    practitioners.map(practitioner => ({
      practitioner,
      revenues: additionalCases.map(cases => calculateRevenue(practitioner, cases))
    })),
    [practitioners, additionalCases, config, calculateRevenue]
  );

  // Generate data for breakeven analysis
  const breakevenData = useMemo(() => {
    return practitioners.map(practitioner => {
      let requiredCasesPerPractitioner = 0;
      
      if (config.usePractitionerFee) {
        // Calculate required cases considering both practitioner fee and case rate
        const monthlyPractitionerRevenue = practitioner * config.baseFee;
        const remainingRevenue = Math.max(0, MONTHLY_COSTS - monthlyPractitionerRevenue);
        requiredCasesPerPractitioner = remainingRevenue / (practitioner * config.caseRate);
      } else {
        // Calculate required cases with just case rate
        requiredCasesPerPractitioner = MONTHLY_COSTS / (practitioner * config.caseRate);
      }
      
      return {
        practitioners: practitioner,
        requiredCasesPerPractitioner: Math.max(0, Math.round(requiredCasesPerPractitioner)),
      };
    });
  }, [practitioners, config]);

  const getRevenueColor = (result: SimulationResult) => {
    const colors = {
      'high-loss': 'bg-red-300 dark:bg-red-800/50',
      'loss': 'bg-red-100 dark:bg-red-900/50',
      'breakeven': 'bg-blue-100 dark:bg-blue-900/50',
      'profit': 'bg-green-100 dark:bg-green-900/50',
      'high-profit': 'bg-green-300 dark:bg-green-800/50'
    };
    return colors[result.profitability];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const InstructionsDialog = () => {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 bg-[--prose-link-decoration] hover:bg-[--prose-link-decoration-hover] shadow-lg hover:shadow-xl transition-shadow">
            <HelpCircle className="h-10 w-10" />
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
            <DialogTitle>How to Use This Simulator</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
            <div className="space-y-3">
                <h3 className="font-medium">Configuration Options:</h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">Per Practitioner Fee</span>: Toggle and set a monthly fee charged per practitioner</li>
                <li><span className="font-medium text-foreground">Price Per Case</span>: Set the fee charged for each anesthesia case</li>
                <li><span className="font-medium text-foreground">Minimum Cases</span>: Set the minimum number of cases included in the base price</li>
                </ul>
            </div>

            <div className="space-y-3">
                <h3 className="font-medium">Understanding the Views:</h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                    <span className="font-medium text-foreground">Revenue Matrix</span>: Shows total monthly revenue and margins for different combinations of:
                    <ul className="list-circle pl-4 mt-1 space-y-1">
                    <li>Number of practitioners (rows)</li>
                    <li>Additional cases beyond minimum (columns)</li>
                    </ul>
                </li>
                <li>
                    <span className="font-medium text-foreground">Breakeven Analysis</span>: Shows how many cases per practitioner are needed to reach the breakeven point ($29,781) at different practice sizes
                </li>
                </ul>
            </div>
            </div>
        </DialogContent>
        </Dialog>
    );
    };

  return (
       
        <div className="relative w-full">
            <div className="flex justify-center align-center">
                <h1 className="text-xl mb-2">Hercules Pricing Analysis Tool</h1>
            </div>
            
          {/* Container that breaks out of the default layout constraints */}
          <div className="absolute left-1/2 right-1/2 -mx-[50vw] w-screen">
            <div className="relative left-1/2 -translate-x-1/2 px-6 w-full max-w-fit">
              {/* Configuration Card */}
              <Card className="mb-8 shadow-md">
              <InstructionsDialog />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold">Pricing Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="baseFee" className="text-sm font-medium">
                        Per Practitioner Fee
                      </Label>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={config.usePractitionerFee}
                          onCheckedChange={checked => setConfig(prev => ({ ...prev, usePractitionerFee: checked }))}
                          className="flex-shrink-0"
                        />
                        <Input
                          id="baseFee"
                          type="number"
                          value={config.baseFee}
                          onChange={e => setConfig(prev => ({ ...prev, baseFee: Number(e.target.value) }))}
                          disabled={!config.usePractitionerFee}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="caseRate" className="text-sm font-medium">
                        Price Per Case
                      </Label>
                      <Input
                        id="caseRate"
                        type="number"
                        value={config.caseRate}
                        onChange={e => setConfig(prev => ({ ...prev, caseRate: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="minimumCases" className="text-sm font-medium">
                        Minimum Cases
                      </Label>
                      <Input
                        id="minimumCases"
                        type="number"
                        value={config.minimumCases}
                        onChange={e => setConfig(prev => ({ ...prev, minimumCases: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
    
              {/* Tabs Container */}
              <div className="space-y-6">
                <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="matrix" className="flex-1 sm:flex-none">Revenue Matrix</TabsTrigger>
                    <TabsTrigger value="breakeven" className="flex-1 sm:flex-none">Breakeven Analysis</TabsTrigger>
                    
                  </TabsList>
     
    
                  <TabsContent value="matrix" className="mt-6">
                    <Card className="shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="p-3 border bg-muted/50 text-left font-medium">
                                    Practitioners
                                  </th>
                                  {additionalCases.map(cases => (
                                    <th key={cases} className="p-3 border bg-muted/50 text-center font-medium">
                                      <span>+{cases} cases</span>
                                      <span className="block text-xs text-muted-foreground">
                                        (Total: {config.minimumCases + cases})
                                      </span>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {matrixData.map(({ practitioner, revenues }) => (
                                  <tr key={practitioner}>
                                    <th className="p-3 border text-left font-medium bg-muted/50">
                                      {practitioner}
                                    </th>
                                    {revenues.map((result, idx) => (
                                      <td
                                        key={idx}
                                        className={`p-3 border text-center transition-colors ${getRevenueColor(result)}`}
                                      >
                                        <div className="font-medium">
                                          {formatCurrency(result.totalRevenue)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {formatPercent(result.margin)} margin
                                        </div>
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
    
                  <TabsContent value="breakeven" className="mt-6">
                    <Card className="shadow-md">
                      <CardContent className="p-6">
                        <div className="flex justify-center w-full overflow-x-auto">
                            <div className="min-w-[800px] h-auto"> {/* Fixed height container */}
                                <LineChart
                                width={800}
                                height={400}
                                data={breakevenData}
                                margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="practitioners"
                                    type="number"
                                    domain={[MIN_PRACTITIONERS, MAX_PRACTITIONERS]}
                                    tickCount={10}
                                />
                                <YAxis
                                    type="number"
                                    domain={[0, 'dataMax + 20']}
                                    tickCount={8}
                                />
                                <Tooltip
                                    formatter={(value: number) => Math.round(value)}
                                    labelFormatter={(value) => `${value} practitioners`}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="requiredCasesPerPractitioner"
                                    name="Required Cases per Practitioner"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 5 }}
                                    isAnimationActive={false} // Helps with initial rendering
                                />
                                </LineChart>
                            </div>
                            </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
    
                {/* Legend */}
                <div className="text-sm text-muted-foreground space-y-1.5 p-4 bg-muted/10 rounded-lg">
                  <p>• Break-even point: {formatCurrency(MONTHLY_COSTS)}</p>
                  <p>• Dark green: Highly profitable ({'>'}50% above break-even)</p>
                  <p>• Light green: Profitable</p>
                  <p>• Blue: Near break-even (±$1,000)</p>
                  <p>• Light red: Unprofitable</p>
                  <p>• Dark red: Highly unprofitable ({'>'}50% below break-even)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default PricingSimulator;