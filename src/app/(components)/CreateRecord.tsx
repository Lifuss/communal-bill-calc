"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateRecordForm {
  electricityKwh?: number;
  gasM3?: number;
  priceElectricity?: number;
  priceGas?: number;
}

const createRecord = async (data: CreateRecordForm) => {
  const res = await fetch("/api/records", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create record");
  }
  return res.json();
};

const CreateRecord = () => {
  const [formData, setFormData] = useState<CreateRecordForm>({});
  const queryClient = useQueryClient();

  const mutation = useMutation(createRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries(["records"]);
      setFormData({});
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2>Create New Record</h2>
      <div>
        <label>
          Electricity (kWh):
          <input
            type="number"
            value={formData.electricityKwh ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                electricityKwh: e.target.value
                  ? parseInt(e.target.value)
                  : undefined,
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Gas (m³):
          <input
            type="number"
            value={formData.gasM3 ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                gasM3: e.target.value ? parseInt(e.target.value) : undefined,
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Price Electricity:
          <input
            type="number"
            step="0.01"
            value={formData.priceElectricity ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priceElectricity: e.target.value
                  ? parseFloat(e.target.value)
                  : undefined,
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Price Gas:
          <input
            type="number"
            step="0.01"
            value={formData.priceGas ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priceGas: e.target.value
                  ? parseFloat(e.target.value)
                  : undefined,
              }))
            }
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {mutation.isLoading ? "Creating..." : "Create Record"}
      </button>
      {mutation.error && (
        <div className="text-red-500">
          Error:{" "}
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Unknown error"}
        </div>
      )}
    </form>
  );
};

export default CreateRecord;
