import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";
function ComparePlans() {
    const packages = [
        {
          name: "Mini Appraisal Package",
          price: "3,950 TL",
          features: {
            "Body / Paint Control": true,
            "Engine / Mechanical Control": true,
            "Lower Mechanical Control on the Lift": false,
            "Front Team, Undercarriage Control": false,
            "OBD Electronic Diagnostic Check": false,
            "Brake, Suspension, Lateral Slip or Road Test": false,
            "Vehicle Interior and Function Control": false,
            "Vehicle Exterior Parts and Function Control": false,
            "Dyno Engine Performance Test or Road Test": false,
          },
        },
        {
          name: "Standard Expertise Package",
          price: "4,500 TL",
          features: {
            "Body / Paint Control": true,
            "Engine / Mechanical Control": true,
            "Lower Mechanical Control on the Lift": true,
            "Front Team, Undercarriage Control": true,
            "OBD Electronic Diagnostic Check": false,
            "Brake, Suspension, Lateral Slip or Road Test": false,
            "Vehicle Interior and Function Control": false,
            "Vehicle Exterior Parts and Function Control": false,
            "Dyno Engine Performance Test or Road Test": false,
          },
        },
        {
          name: "Full Expertise Package",
          price: "4,750 TL",
          features: {
            "Body / Paint Control": true,
            "Engine / Mechanical Control": true,
            "Lower Mechanical Control on the Lift": true,
            "Front Team, Undercarriage Control": true,
            "OBD Electronic Diagnostic Check": true,
            "Brake, Suspension, Lateral Slip or Road Test": true,
            "Vehicle Interior and Function Control": true,
            "Vehicle Exterior Parts and Function Control": true,
            "Dyno Engine Performance Test or Road Test": true,
          },
        },
      ];
    
      const featureOrder = [
        "Body / Paint Control",
        "Engine / Mechanical Control",
        "Lower Mechanical Control on the Lift",
        "Front Team, Undercarriage Control",
        "OBD Electronic Diagnostic Check",
        "Brake, Suspension, Lateral Slip or Road Test",
        "Vehicle Interior and Function Control",
        "Vehicle Exterior Parts and Function Control",
        "Dyno Engine Performance Test or Road Test",
      ];
  return (
    <div className="container mx-auto p-1 shadow-custom-right mt-10">
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse  ">
        <thead>
          <tr className="font-Roboto">
            <th className="p-4 border border-[#E6E9F5]  bg-white text-left font-bold text-[24px] text-[#1544AB]">
              Compare plans
            </th>
            {packages.map((pkg, index) => (
              <th
                key={index}
                className="p-4 border border-[#E6E9F5] bg-white text-center font-bold text-[#231E1C] text-[22px]"
              >
                {pkg.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureOrder.map((feature, index) => (
            <tr key={index} className="border-b  ">
              <td className="p-4 border border-[#E6E9F5] bg-white font-medium font-Inter  text-black text-[18px]">
                {feature}
              </td>
              {packages.map((pkg, pkgIndex) => (
                <td
                  key={pkgIndex}
                  className="p-4 border shadow-lg border-[#E6E9F5]  bg-white text-center"
                >
                  {pkg.features[feature] ? (
                    <RiVerifiedBadgeFill
                      className="mx-auto text-[#1544AB]"
                      size={24}
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-4 border border-[#E6E9F5] bg-white"></td>
            {packages.map((pkg, index) => (
              <td key={index} className="p-6 border border-[#E6E9F5] bg-white text-center">
                <div className="text-[#1544AB] text-[40px] font-Roboto font-bold mb-6">
                  {pkg.price}
                </div>
                <button className="bg-[#1544AB] font-Inter font-bold text-[14px] text-[#E6E9F5] py-3 px-4 w-full rounded">
                  Choose This Plan
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ComparePlans