import { supabase } from "./supabase";

/*
  Get the currently logged-in user's ID
*/
async function getCurrentUserId() {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("You must be logged in.");
  }

  return user.id;
}


/*
  Save one resume analysis
*/
export async function saveAnalysis({
  jobDescription,
  resumeFilename,
  result,
}) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const userId = await getCurrentUserId();

  const analysis = {
    user_id: userId,

    job_title: null,

    job_description: jobDescription,

    resume_filename: resumeFilename || null,

    score: Number(result.score),

    matched_skills: Array.isArray(result.matched_skills)
      ? result.matched_skills
      : [],

    missing_skills: Array.isArray(result.missing_skills)
      ? result.missing_skills
      : [],

    strengths: result.strengths || "",

    improvements: result.improvements || "",

    recommendation: result.recommendation || "",
  };

  const { data, error } = await supabase
    .from("analyses")
    .insert([analysis])
    .select()
    .single();

  if (error) {
    console.error("Supabase saveAnalysis error:", error);
    throw new Error(error.message);
  }

  return data;
}


/*
  Get all analyses belonging to the current user
*/
export async function fetchAnalyses() {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Supabase fetchAnalyses error:", error);
    throw new Error(error.message);
  }

  return data || [];
}


/*
  Get dashboard statistics
*/
export async function fetchAnalysisStats() {
  const analyses = await fetchAnalyses();

  if (!analyses.length) {
    return {
      total: 0,
      averageScore: 0,
      bestScore: 0,
      totalMissingSkills: 0,
      recent: [],
    };
  }

  const total = analyses.length;

  const averageScore = Math.round(
    analyses.reduce(
      (sum, analysis) => sum + Number(analysis.score || 0),
      0
    ) / total
  );

  const bestScore = Math.max(
    ...analyses.map((analysis) =>
      Number(analysis.score || 0)
    )
  );

  const totalMissingSkills = analyses.reduce(
    (sum, analysis) =>
      sum + (analysis.missing_skills?.length || 0),
    0
  );

  return {
    total,
    averageScore,
    bestScore,
    totalMissingSkills,
    recent: analyses.slice(0, 5),
  };
}