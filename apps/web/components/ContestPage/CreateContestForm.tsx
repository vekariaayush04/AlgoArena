"use client";
import { createContestAction } from "@/app/actions/CreateContestAction";
import { Problem } from "@/app/problems/page";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

export type ContestFormData = {
  name: string;
  description: string;
  startDate: string;
  startTime: string;
  duration: number;
  problems: string[];
};

const CreateContestForm = ({ problems }: { problems: Problem[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContestFormData>({
    defaultValues: {
      problems: [],
    },
  });

  const selectedProblems = watch("problems");

  const problemOptions = problems.map((problem) => ({
    value: problem.id,
    label: problem.title,
  }));

  const handleProblemSelect = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setValue("problems", selectedIds);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <form
          onSubmit={handleSubmit(async (data) => {
            const r = await createContestAction(data);
            r.success ? toast.success(r.message) : toast.error(r.message);
          })}
        >
          <input
            type="text"
            placeholder="Enter Contest Name"
            {...register("name", { required: true })}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Describe the contest"
            {...register("description")}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="date"
            placeholder="dd-mm-yyyy"
            {...register("startDate", { required: true })}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="time"
            placeholder="--:-- AM"
            {...register("startTime", { required: true })}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            placeholder="eg. 180 minutes"
            defaultValue={180}
            {...register("duration", { required: true })}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="mb-4">
            <label htmlFor="problems" className="block mb-2 font-medium">
              Select Problems
            </label>
            <Select
              isMulti
              options={problemOptions}
              value={problemOptions.filter((option) =>
                selectedProblems.includes(option.value)
              )}
              onChange={handleProblemSelect}
              className="react-select-container text-black bg-primary"
              classNamePrefix="react-select"
              placeholder="Select problems..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-content-primary px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Contest
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateContestForm;