
import React, { useState, useEffect } from 'react';
import { parseWorkOrderEmail } from './services/geminiService';
import { WorkOrderData, ParsingStatus, GmailMessage } from './types';
import WorkOrderTemplate from './components/WorkOrderTemplate';

const MOCK_EMAIL: GmailMessage = {
  subject: "SERVICE REQUEST: CC234 - Urgent Lighting Repair",
  sender: "facilities@retailcorp.com",
  date: "Oct 24, 2024",
  body: `Hello Dynamic Systems Team,
  
We have an urgent repair needed at our Detroit location (CC234).
Work Order ID: #WO-99283
Location: RetailCorp Store #234
Address: 1234 Woodward Ave, Detroit, MI 48226

Problem: Main sales floor lights are flickering and 3 ballasts have failed completely. Needs immediate attention before store opening tomorrow.

IVR Check-in: 888-555-0199
PIN: 4452
Tracking: DS-REF-99283`
};

const App: React.FC = () => {
  const [status, setStatus] = useState<ParsingStatus>(ParsingStatus.IDLE);
  const [activeMessage, setActiveMessage] = useState<GmailMessage | null>(null);
  const [workOrderData, setWorkOrderData] = useState<WorkOrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Simulates the "Fetch Current Email" action of a Gmail Add-on
  const fetchCurrentEmail = () => {
    setStatus(ParsingStatus.FETCHING);
    setTimeout(() => {
      setActiveMessage(MOCK_EMAIL);
      setStatus(ParsingStatus.IDLE);
    }, 800);
  };

  const handleTransform = async () => {
    if (!activeMessage) return;

    setStatus(ParsingStatus.PARSING);
    setError(null);

    try {
      const data = await parseWorkOrderEmail(activeMessage.body);
      setWorkOrderData(data);
      setStatus(ParsingStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze email content.");
      setStatus(ParsingStatus.ERROR);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (showPrintPreview && workOrderData) {
    return (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="no-print max-w-[210mm] mx-auto mb-6 flex justify-between items-center px-4">
          <button 
            onClick={() => setShowPrintPreview(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to Sidebar
          </button>
          <button 
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
             Save as PDF
          </button>
        </div>
        <WorkOrderTemplate data={workOrderData} />
      </div>
    );
  }

  return (
    <div className="sidebar-container no-print">
      {/* Sidebar Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <span className="text-yellow-400 font-bold text-[10px] italic">DS</span>
          </div>
          <span className="font-bold text-gray-700">WorkOrder Pro</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {status === ParsingStatus.FETCHING ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-sm text-gray-500">Reading active email...</p>
          </div>
        ) : !activeMessage ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">No Email Selected</h3>
            <p className="text-xs text-gray-500 px-6 mb-6">Open a customer work order email to begin the transformation.</p>
            <button 
              onClick={fetchCurrentEmail}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95"
            >
              Fetch Active Email
            </button>
          </div>
        ) : (
          <>
            {/* Active Email Preview Card */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Detected Message</span>
              </div>
              <h4 className="font-bold text-sm text-gray-900 truncate mb-1">{activeMessage.subject}</h4>
              <p className="text-xs text-gray-500 mb-3">{activeMessage.sender} • {activeMessage.date}</p>
              <div className="text-[11px] text-gray-600 line-clamp-3 bg-white p-2 rounded border border-gray-100 italic">
                "{activeMessage.body}"
              </div>
            </div>

            {status === ParsingStatus.PARSING ? (
              <div className="py-4 space-y-3">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 animate-[loading_1.5s_infinite] w-1/3 origin-left"></div>
                </div>
                <p className="text-xs text-center font-medium text-gray-500">AI is extracting service details...</p>
                <style>{`
                  @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                  }
                `}</style>
              </div>
            ) : status === ParsingStatus.SUCCESS && workOrderData ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-700 p-1 rounded-full text-xs font-bold">✓</div>
                    <div>
                      <h5 className="text-sm font-bold text-green-800">Ready for Internal File</h5>
                      <p className="text-[11px] text-green-700 mt-0.5">Work Order #{workOrderData.workOrderNumber} was successfully parsed.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => setShowPrintPreview(true)}
                    className="w-full bg-black text-white py-3 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                  >
                    Generate & Open PDF
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </button>
                  <button 
                    onClick={() => setActiveMessage(null)}
                    className="w-full text-gray-500 py-2 text-xs font-medium hover:text-gray-700"
                  >
                    Clear and start over
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleTransform}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
              >
                Create Work Order
              </button>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-[11px] rounded-lg border border-red-100">
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
          <span>DYNAMIC SYSTEMS v2.0</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            CONNECTED
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
