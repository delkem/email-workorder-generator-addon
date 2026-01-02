
import React from 'react';
import { WorkOrderData } from '../types';

interface Props {
  data: WorkOrderData;
}

const WorkOrderTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div id="printable-area" className="bg-white w-[210mm] min-h-[297mm] p-10 mx-auto shadow-lg text-sm leading-relaxed text-[#2D3748] border">
      {/* Header section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="bg-black p-1 rounded">
                <span className="text-yellow-400 font-bold italic text-xl">DYNAMIC</span>
             </div>
             <div className="text-gray-800 font-bold text-lg">SYSTEMS</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">FACILITIES & MAINTENANCE SOLUTIONS</div>
        </div>
        <div className="text-right text-[10px] text-gray-600">
          <p>25401 Glendale, Redford, MI 48239 <span className="inline-block ml-1">📍</span></p>
          <p>800-252-1145 <span className="inline-block ml-1">📞</span></p>
          <p>workorders@dynsys.com <span className="inline-block ml-1">✉️</span></p>
        </div>
      </div>

      {/* WO Title and Main Info Row */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-[10px] uppercase font-bold text-gray-500 mb-2">SERVICE LOCATION</h2>
          <div className="mb-4">
            <div className="font-bold text-lg uppercase">{data.locationName || 'N/A'}</div>
            <div className="text-gray-700 font-semibold">{data.locationId || 'N/A'}</div>
          </div>
          <div className="border-l-4 border-gray-200 pl-4 py-1">
            <p className="text-gray-700 uppercase font-medium">{data.address || 'N/A'}</p>
            <p className="text-gray-700 uppercase font-medium">{data.cityStateZip || 'N/A'}</p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <h1 className="text-2xl font-bold mb-4">Workorder: {data.workOrderNumber || 'N/A'}</h1>
          
          <div className="mb-4">
            <h2 className="text-[10px] uppercase font-bold text-gray-400">IVR CHECK-IN LINE</h2>
            <div className="text-blue-700 font-bold text-xl">{data.ivrCheckInLine || 'N/A'}</div>
          </div>

          <div className="mb-4">
            <h2 className="text-[10px] uppercase font-bold text-gray-400">ACCOUNT CODE / PIN</h2>
            <div className="text-blue-700 font-bold text-xl">{data.accountCodePin || 'N/A'}</div>
          </div>

          <div className="">
            <h2 className="text-[10px] uppercase font-bold text-gray-400">DS TRACKING #</h2>
            <div className="text-blue-700 font-bold text-xl">{data.dsTrackingNumber || data.workOrderNumber || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div className="mb-8">
        <h2 className="text-[10px] uppercase font-bold text-gray-500 mb-2">PROBLEM DESCRIPTION</h2>
        <div className="border-2 border-black p-6 min-h-[160px] text-base font-bold uppercase whitespace-pre-wrap leading-snug">
          {data.problemDescription || 'No description provided.'}
        </div>
      </div>

      {/* Instructions Box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-10 flex items-start gap-3">
        <div className="bg-yellow-100 text-yellow-800 p-1 rounded-full text-xs">✓</div>
        <p className="text-yellow-800 font-medium">
          When arriving on site, please contact Dynamic at 313-563-1145 to check in and give assessment.
        </p>
      </div>

      {/* Check-in Times Section */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-12">
            <div>
                <h2 className="text-[10px] uppercase font-bold text-gray-500 mb-4">COMMENTS</h2>
                <div className="border-b border-gray-300 w-full h-[80px]"></div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[10px] uppercase font-bold text-gray-500 whitespace-nowrap">ASSIGNED TECH ID:</span>
               <div className="border-b border-gray-300 flex-1"></div>
            </div>
        </div>
        
        <div className="space-y-6">
           <div className="flex flex-col items-end">
             <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">CHECK IN DATE</span>
             <div className="border-b-2 border-black w-48 h-8"></div>
           </div>
           <div className="flex flex-col items-end">
             <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">CHECK IN TIME</span>
             <div className="border-b-2 border-black w-48 h-8"></div>
           </div>
           <div className="flex flex-col items-end">
             <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">CHECK OUT TIME</span>
             <div className="border-b-2 border-black w-48 h-8"></div>
           </div>
        </div>
      </div>

      {/* Signatures Footer */}
      <div className="grid grid-cols-2 gap-20 mt-20 pt-10">
        <div className="text-center">
            <div className="border-t-2 border-black mb-1"></div>
            <span className="text-[11px] font-bold uppercase tracking-widest">TECHNICIAN SIGNATURE</span>
        </div>
        <div className="text-center">
            <div className="border-t-2 border-black mb-1"></div>
            <span className="text-[11px] font-bold uppercase tracking-widest">MANAGER PRINT & SIGN</span>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderTemplate;
