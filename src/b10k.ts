export class B10K {
    public static fields = [
        { name: "name", label: "B10K ID", group: "" },
        { name: "taxOrder", label: "Order", group: "Taxonomy" },
        { name: "family", label: "Family", group: "Taxonomy" },
        { name: "latinName", label: "Latin name", group: "Taxonomy" },
        { name: "commonName", label: "Common name", group: "Taxonomy" },
        { name: "subspecies", label: "Subspecies", group: "Taxonomy" },
        { name: "iucn", label: "IUCN", group: "Taxonomy" },
        { name: "tissue", label: "Tissue", group: "Sample information" },
        { name: "bioprojectAssociation", label: "Bioproject accession", group: "Sample information" },
        { name: "biosample", label: "BioSample", group: "Sample information" },
        { name: "sraAccession", label: "SRA Accession", group: "Sample information" },
        { name: "genomeAccession", label: "Genome Accession", group: "Sample information" },
        { name: "sourceInstitution", label: "Source institution", group: "Sample information" },
        { name: "museumID", label: "Museum ID/Source specimen ID", group: "Sample information" },
        { name: "captivityDetails", label: "Captivity details", group: "Sample information" },
        { name: "site", label: "Site", group: "Sample information" },
        { name: "state", label: "State/Province", group: "Sample information" },
        { name: "county", label: "County/District", group: "Sample information" },
        { name: "country", label: "Country", group: "Sample information" },
        { name: "latitude", label: "Latitude", group: "Sample information" },
        { name: "longtitude", label: "Longitude", group: "Sample information" },
        { name: "coordinateNotes", label: "Coordinate notes", group: "Sample information" },
        { name: "elevation_masl", label: "Elevation (masl)", group: "Sample information" },
        { name: "dateCollected", label: "Date collected", group: "Sample information" },
        { name: "sec", label: "Sex", group: "Sample information" },
        { name: "contig_n50_bp", label: "Contig_N50 (bp)", group: "Assembly" },
        { name: "config_l50_bp", label: "Contig_L50 (bp)", group: "Assembly" },
        { name: "nContigs", label: "Contig_Num", group: "Assembly" },
        { name: "scaffold_n50_bp", label: "Scaffold_N50 (bp)", group: "Assembly" },
        { name: "scaffold_l50_bp", label: "Scaffold_L50 (bp)", group: "Assembly" },
        { name: "nScaffolds", label: "Scaffold_Num (bp)", group: "Assembly" },
        { name: "totalLen_bp", label: "Total_Len (bp)", group: "Assembly" },
        { name: "gapLen_bp", label: "Gap_Len (bp)", group: "Assembly" },
        { name: "gapRatio_pct", label: "Gap_Ratio (%)", group: "Assembly" },
        { name: "completeBuscos_pct", label: "Complete BUSCOs (C, %)", group: "Assembly" },
        { name: "completeAndSCBuscos_pct", label: "Complete and single-copy BUSCOs (S, %)", group: "Assembly" },
        { name: "completeAndDupBuscos_pct", label: "Complete and duplicated BUSCOs (D, %)", group: "Assembly" },
        { name: "fragmentedBuscos_pct", label: "Fragmented BUSCOs (F, %)", group: "Assembly" },
        { name: "missingBuscos_pct", label: "Missing BUSCOs (M, %)", group: "Assembly" },
        { name: "cgContent_pct", label: "CG content(%)", group: "Assembly" },
        { name: "depth", label: "Depth", group: "Assembly" },
        { name: "nGenes", label: "Number of total gene", group: "Gene annotations" },
        { name: "nGenes", label: "Number of total gene", group: "Gene annotations" },
        { name: "meanGeneLength_bp", label: "Mean Gene Length (bp)", group: "Gene annotations" },
        { name: "meanCDSLength_bp", label: "Mean CDS Length(bp)", group: "Gene annotations" },
        { name: "meanExonNumber", label: "Mean Exon Number", group: "Gene annotations" },
        { name: "meanExonLength_bp", label: "Mean Exon Length (bp)", group: "Gene annotations" },
        { name: "meanIntronNumber", label: "Mean Intron Number", group: "Gene annotations" },
        { name: "meanIntronLength_bp", label: "Mean Intron Length (bp)", group: "Gene annotations" },
        { name: "nSingleExonGenes", label: "Number of single exon gene", group: "Gene annotations" },
        { name: "dna_pct", label: "DNA (%)", group: "Rpeat annotation" },
        { name: "sine_pct", label: "SINE (%)", group: "Rpeat annotation" },
        { name: "ltr_pct", label: "LTR (%)", group: "Rpeat annotation" },
        { name: "rc_pct", label: "RC (%)", group: "Rpeat annotation" },
        { name: "other_pct", label: "Other (%)", group: "Rpeat annotation" },
        { name: "line_pct", label: "LINE (%)", group: "Rpeat annotation" },
        { name: "unknown_pct", label: "Unknown (%)", group: "Rpeat annotation" },
        { name: "total_pct", label: "Total (%)", group: "Rpeat annotation" },
        { name: "completeness", label: "Completeness", group: "Mitochondrial genome assembly & annotation" },
        { name: "totalAssembledLength", label: "Total assembled length", group: "Mitochondrial genome assembly & annotation" },
        { name: "largestContigLength", label: "Largest contig length", group: "Mitochondrial genome assembly & annotation" },
        { name: "nAssembledContigs", label: "Number of assembled contigs", group: "Mitochondrial genome assembly & annotation" },
        { name: "nGenesOnLargestContig", label: "Gene number on the largest contig", group: "Mitochondrial genome assembly & annotation" },
        { name: "nProteinsOnLargestContig", label: "Largest contig protein coding gene number", group: "Mitochondrial genome assembly & annotation" },
        { name: "nTRNAOnLargestContig", label: "Largest contig tRNA gene number", group: "Mitochondrial genome assembly & annotation" },
        { name: "nRRNAOnLargestContig", label: "Largest contig rRNA gene number", group: "Mitochondrial genome assembly & annotation" },
        { name: "publicshedMTSequence", label: "Published mt-sequence", group: "Mitochondrial genome assembly & annotation" },
        { name: "mtAccession", label: "MT_Accesion", group: "Mitochondrial genome assembly & annotation" },

    ];
}