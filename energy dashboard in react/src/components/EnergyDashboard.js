import React, { useState } from 'react';

const EnergyDashboard = () => {
    // Main state
    const [activeMenu, setActiveMenu] = useState('mainMenu');
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('English');

    // Header Component
    const Header = () => (
        <div className="flex justify-end gap-3 mb-5">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-2 rounded bg-gray-100"
            >
                <option>English</option>
                <option>Kiswahili</option>
                <option>Kinyarwanda</option>
            </select>
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                ☀️ / 🌙
            </button>
        </div>
    );

    const BatteryStatus = () => (
        <div>
            <div className="text-right mb-2">Battery Level: 72%</div>
            <div className="bg-gray-200 rounded-xl h-6 w-full mb-5 overflow-hidden">
                <div className="bg-green-500 h-full w-[72%] transition-all duration-300" style={{ backgroundColor: '#455A64' }}></div>
            </div>
        </div>
    );

    const MainMenu = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Main Menu</h2>
            <BatteryStatus />
            <div className="space-y-3">
                <button
                    onClick={() => setActiveMenu('energyStatus')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    My Energy
                </button>
                <button
                    onClick={() => setActiveMenu('communityDashboard')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Community Dashboard
                </button>
                <button
                    onClick={() => setActiveMenu('help')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Help
                </button>
            </div>
        </div>
    );

    const EnergyStatus = () => (
        <div>

            <div className="space-y-3">
                <button onClick={() => setActiveMenu('sellEnergy')} className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    Sell Energy
                </button>
                <button onClick={() => setActiveMenu('earnings')} className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    View Earnings/Costs
                </button>
                <button onClick={() => setActiveMenu('hourlyBreakdown')} className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    View Hourly Breakdown
                </button>
                <button onClick={() => setActiveMenu('scheduleDevice')} className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    Schedule Device Usage
                </button>
                <button onClick={() => setActiveMenu('alerts')} className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    Set Alerts
                </button>
                <button onClick={() => setActiveMenu('mainMenu')} className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    Back to Main Menu
                </button>
            </div>
        </div>
    );

    const SellEnergy = () => {
        const [sellMode, setSellMode] = useState('exact');
        const [kwhInput, setKwhInput] = useState('');
        const [error, setError] = useState('');
        const [result, setResult] = useState('');

        const validateAndCalculate = (value) => {
            if (isNaN(value) || value === '') {
                setError('Put a number');
                setResult('');
            } else {
                setError('');
                const pricePerKwh = 0.95;
                const totalPrice = (parseFloat(value) * pricePerKwh).toFixed(2);
                setResult(`You are now selling ${value} kWh, about ${totalPrice} USD`);
            }
        };

        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Sell Energy</h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <div className="text-sm text-gray-600">Current settings:</div>
                    <div className="font-bold">Share percentage: 40%</div>
                </div>

                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setSellMode('exact')}
                        className={`flex-1 p-2 rounded ${sellMode === 'exact' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                        Sell Exact kWh
                    </button>
                    <button
                        onClick={() => setSellMode('percentage')}
                        className={`flex-1 p-2 rounded ${sellMode === 'percentage' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                        Sell Percentage
                    </button>
                </div>

                {sellMode === 'exact' ? (
                    <div>
                        <label className="block mb-2">Sell kWh:</label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={kwhInput}
                            onChange={(e) => {
                                setKwhInput(e.target.value);
                                validateAndCalculate(e.target.value);
                            }}
                            className="w-full p-2 border rounded mb-2"
                        />
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        {result && <div className="bg-gray-100 p-3 rounded mb-4">{result}</div>}
                    </div>
                ) : (
                    <div>
                        <label className="block mb-2">Set Sharing Percentage:</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            defaultValue="40"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                )}

                <button
                    onClick={() => setActiveMenu('energyStatus')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg mt-4"
                >
                    Back
                </button>
            </div>
        );
    };

    const Earnings = () => {
        const [earningsPeriod, setEarningsPeriod] = useState('today');

        const earningsData = {
            today: { sharing: 0.20, consumption: 0.80 },
            week: { sharing: 1.20, consumption: 1.80 },
            month: { sharing: 8.20, consumption: 12.80 }
        };

        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Earnings & Costs Overview</h2>
                <div className="flex gap-2 mb-4">
                    {['today', 'week', 'month'].map(period => (
                        <button
                            key={period}
                            onClick={() => setEarningsPeriod(period)}
                            className={`flex-1 p-2 rounded ${earningsPeriod === period ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                        <span>Earnings from sharing:</span>
                        <span>${earningsData[earningsPeriod].sharing.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Costs from consumption:</span>
                        <span>${earningsData[earningsPeriod].consumption.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300 font-bold">
                        <span>Net balance:</span>
                        <span>${(earningsData[earningsPeriod].sharing - earningsData[earningsPeriod].consumption).toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={() => setActiveMenu('energyStatus')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg"
                >
                    Back
                </button>
            </div>
        );
    };
    const HourlyBreakdown = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Hourly Energy Breakdown</h2>
            <div className="overflow-x-auto mb-4">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Time</th>
                            <th className="p-3 text-right">Generated (kWh)</th>
                            <th className="p-3 text-right">Used (kWh)</th>
                            <th className="p-3 text-right">Net (kWh)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { time: '06:00', generated: 0.3, used: 0.2 },
                            { time: '07:00', generated: 0.5, used: 0.3 },
                            { time: '08:00', generated: 0.2, used: 0.0 },
                            { time: '09:00', generated: 0.1, used: 0.0 }
                        ].map((hour, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="p-3 border-t">{hour.time}</td>
                                <td className="p-3 border-t text-right">{hour.generated}</td>
                                <td className="p-3 border-t text-right">{hour.used}</td>
                                <td className="p-3 border-t text-right">{(hour.generated - hour.used).toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => setActiveMenu('energyStatus')}
                className="w-full bg-green-500 text-white p-4 rounded-lg"
            >
                Back
            </button>
        </div>
    );

    const ScheduleDevice = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Schedule Device Usage</h2>
            <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <label className="block mb-2">Device</label>
                        <select className="w-full p-2 border rounded">
                            <option>Washing Machine</option>
                            <option>Water Heater</option>
                            <option>Dishwasher</option>
                            <option>Electric Vehicle</option>
                        </select>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <label className="block mb-2">Duration</label>
                        <select className="w-full p-2 border rounded">
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>3 hours</option>
                        </select>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <label className="block mb-2">Start Time</label>
                    <select className="w-full p-2 border rounded">
                        {Array.from({ length: 24 }, (_, i) => (
                            <option key={i}>{`${String(i).padStart(2, '0')}:00`}</option>
                        ))}
                    </select>
                </div>

                <button className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
                    Schedule Device
                </button>
            </div>

            <button
                onClick={() => setActiveMenu('energyStatus')}
                className="w-full bg-green-500 text-white p-4 rounded-lg"
            >
                Back
            </button>
        </div>
    );
    // Alerts Component
    const Alerts = () => {
        const [alertThreshold, setAlertThreshold] = useState(100);
        const [error, setError] = useState('');

        const validateAlertInput = (value) => {
            if (isNaN(value) || value === '') {
                setError('Put a number');
                return;
            }
            setError('');
            const threshold = parseFloat(value);
            if (threshold < 3.1) {
                alert('Alert: Current consumption (3.1 kWh) is above your set threshold!');
            }
        };

        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Set Alerts</h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="font-bold mb-3">Consumption Alert</h3>
                    <div className="mb-4">
                        <label className="block mb-2">Alert me when consumption exceeds:</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                value={alertThreshold}
                                onChange={(e) => {
                                    setAlertThreshold(e.target.value);
                                    validateAlertInput(e.target.value);
                                }}
                                className="w-32 p-2 border rounded"
                            />
                            <span>kWh</span>
                        </div>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span>Status:</span>
                        <span>Active ({alertThreshold} kWh threshold)</span>
                    </div>
                </div>
                <button
                    onClick={() => setActiveMenu('energyStatus')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg"
                >
                    Back
                </button>
            </div>
        );
    };

    // Community Dashboard Component
    const CommunityDashboard = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Community Overview</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Total Households</div>
                    <div className="font-bold text-lg">25</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Community Generation</div>
                    <div className="font-bold text-lg">55 kWh</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center col-span-2">
                    <div className="text-sm text-gray-600">Shared Pool</div>
                    <div className="font-bold text-lg">12.3 kWh</div>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => setActiveMenu('topContributors')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    View top contributors
                </button>
                <button
                    onClick={() => setActiveMenu('communityStats')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Community stats
                </button>
                <button
                    onClick={() => setActiveMenu('energyNeed')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Register energy need
                </button>
                <button
                    onClick={() => setActiveMenu('mainMenu')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Back to main menu
                </button>
            </div>
        </div>
    );
    // Top Contributors Component
    const TopContributors = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Top Energy Sharers</h2>
            <div className="space-y-3 mb-4">
                {[
                    { house: 'House #15', shared: 3.2 },
                    { house: 'House #04', shared: 2.8 },
                    { house: 'Your house', shared: 2.1 }
                ].map((contributor, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <span className="font-bold mr-2">{index + 1}.</span>
                            {contributor.house}
                        </div>
                        <div>{contributor.shared} kWh shared</div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => setActiveMenu('communityDashboard')}
                className="w-full bg-green-500 text-white p-4 rounded-lg"
            >
                Back
            </button>
        </div>
    );

    // Community Stats Component
    const CommunityStats = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Community Statistics</h2>
            <div className="space-y-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Average Daily Generation</div>
                    <div className="font-bold text-lg">52 kWh</div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Peak Generation Time</div>
                    <div className="font-bold text-lg">11:00-15:00</div>
                    <div className="text-sm text-gray-500 mt-1">
                        Best time to schedule high-power activities
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Peak Consumption Time</div>
                    <div className="font-bold text-lg">16:00-18:00</div>
                    <div className="text-sm text-gray-500 mt-1">
                        Consider reducing usage during these hours
                    </div>
                </div>
            </div>
            <button
                onClick={() => setActiveMenu('communityDashboard')}
                className="w-full bg-green-500 text-white p-4 rounded-lg"
            >
                Back
            </button>
        </div>
    );

    // Help Component
    const Help = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Help Menu</h2>
            <div className="space-y-3">
                <button
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Guidelines on how energy sharing works
                </button>
                <button
                    onClick={() => alert('Calling community support...')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Contact community support person
                </button>
                <button
                    onClick={() => setActiveMenu('mainMenu')}
                    className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Back to main menu
                </button>
            </div>
        </div>
    );

    // Main render method
    return (
        <div className={`max-w-xl mx-auto p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Header />

            {activeMenu === 'mainMenu' && <MainMenu />}
            {activeMenu === 'energyStatus' && <EnergyStatus />}
            {activeMenu === 'sellEnergy' && <SellEnergy />}
            {activeMenu === 'earnings' && <Earnings />}
            {activeMenu === 'hourlyBreakdown' && <HourlyBreakdown />}
            {activeMenu === 'scheduleDevice' && <ScheduleDevice />}
            {activeMenu === 'alerts' && <Alerts />}
            {activeMenu === 'communityDashboard' && <CommunityDashboard />}
            {activeMenu === 'topContributors' && <TopContributors />}
            {activeMenu === 'communityStats' && <CommunityStats />}
            {activeMenu === 'help' && <Help />}
        </div>
    );
};

export default EnergyDashboard;