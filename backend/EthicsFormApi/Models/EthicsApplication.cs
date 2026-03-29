namespace EthicsFormApi.Models;

public class EthicsApplication
{
    public int Id { get; set; }

    // Step 1: Applicant Info
    public required string ApplicantName { get; set; }
    public required string Email { get; set; }
    public required string Department { get; set; }
    public required string SupervisorName { get; set; }

    // Step 2: Ethics & Risk
    public required string EthicsCategory { get; set; } // "human" | "animal" | "environmental"
    public int RiskLevel { get; set; }
    public bool InvolvesFunding { get; set; }
    public string? FundingSource { get; set; }

    // Step 3: Research Details
    public required string ProjectTitle { get; set; }
    public required string ProjectDescription { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int ParticipantCount { get; set; }

    // Step 4: Declaration
    public bool AgreedToTerms { get; set; }
    public bool AgreedToDataPolicy { get; set; }
    public required string Signature { get; set; }

    // Metadata
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}