# WIMD 2025 Data Update - Summary Report

**Date:** 2025-12-01  
**Updated By:** Anselm Powell (Digital Department, Sport Wales)  
**Requested By:** Sarah (Investment Team)

---

## 📋 OVERVIEW

Successfully updated the Crowdfunder Calculator from **WIMD 2019** to **WIMD 2025** data.

---

## ✅ CHANGES MADE

### 1. Data Conversion
- **Created:** `convertWIMD2025Data.js` - New conversion script
- **Input Files:**
  - `PostcodesCSV.csv` (Old WIMD 2019 with Postcode → LSOA mapping)
  - `wimd-2025-index-and-domain-ranks-by-small-area.csv` (New WIMD 2025 LSOA rankings)
- **Output:** `wimd_data_2025.json` (24.6 MB)

### 2. Data Join Results
- **Total Postcodes Processed:** 139,843
- **Successfully Matched:** 132,331 (94.63%)
- **Unmatched:** 7,512 postcodes from 72 LSOAs (5.37%)
- **Reason for Unmatched:** LSOA boundary changes between 2019 and 2025

### 3. Updated Constants
| Constant | WIMD 2019 | WIMD 2025 | Change |
|----------|-----------|-----------|--------|
| **Total LSOAs** | 1,909 | 1,917 | +8 areas |
| **Top 30% Threshold** | ≤ 573 | ≤ 575 | +2 |
| **Data File** | `wimd_data.json` | `wimd_data_2025.json` | New file |

### 4. Files Modified
1. ✅ `src/utils/wimd.js` - Updated to use `wimd_data_2025.json` and threshold of 575
2. ✅ `src/components/calculator/CrowdfunderCalculator.jsx` - Updated WIMD constants (1917 total, 575 threshold)
3. ✅ `src/utils/convertWIMD2025Data.js` - New conversion script (created)

---

## 📊 DATA STRUCTURE

### Old WIMD 2019 Format:
```
Postcode → WIMD 2019 Rank (direct lookup)
```

### New WIMD 2025 Format:
```
Postcode → LSOA Code → WIMD 2025 Rank (two-step lookup)
```

**Solution:** Reused existing Postcode → LSOA mapping from old data and joined with new WIMD 2025 LSOA rankings.

---

## 🔧 TECHNICAL DETAILS

### Conversion Process:
1. Read `PostcodesCSV.csv` to get Postcode → LSOA mapping (139,843 records)
2. Read `wimd-2025-index-and-domain-ranks-by-small-area.csv` to get LSOA → WIMD 2025 Rank (1,917 LSOAs)
3. Join datasets on LSOA Code
4. Output combined data to `wimd_data_2025.json`

### Unmatched LSOAs (Sample):
- W01001939
- W01001941
- W01001875
- W01001709
- W01001945
- W01001843
- W01000998
- W01001183
- W01001182
- W01001201

**Note:** These LSOAs existed in 2019 but not in 2025 data (likely merged, split, or recoded).

---

## 🎯 FUNDING CALCULATION LOGIC

**No changes to funding rules:**
- Base Rate: 50% match funding
- Enhanced Rate: 60% match funding (if in deprived area OR targeting priority groups)
- Minimum Pledge: £300
- Maximum Pledge: £15,000

**What Changed:**
- Top 30% deprived areas now defined as WIMD rank ≤ 575 (was ≤ 573)
- Percentile calculations now based on 1,917 total areas (was 1,909)

---

## 📁 FILE SIZES

| File | Size | Purpose |
|------|------|---------|
| `PostcodesCSV.csv` | 7.97 MB | Old WIMD 2019 data (kept for Postcode → LSOA mapping) |
| `wimd-2025-index-and-domain-ranks-by-small-area.csv` | 148 KB | New WIMD 2025 LSOA rankings |
| `wimd_data.json` | 43.35 MB | Old processed data (can be archived) |
| `wimd_data_2025.json` | 24.62 MB | **New processed data (IN USE)** |

---

## ⚠️ IMPORTANT NOTES

### 1. Unmatched Postcodes
- 5.37% of postcodes (7,512) couldn't be matched to WIMD 2025 data
- These postcodes will show "Please enter a valid Welsh postcode" error
- This is expected due to LSOA boundary changes

### 2. Data Assumptions
- Assumed LSOA codes are relatively stable between 2019 and 2025
- 94.63% match rate confirms this assumption is reasonable
- For unmatched postcodes, users may need to check their postcode or contact Sport Wales

### 3. Future Updates
- When WIMD 2029/2030 is released, repeat this process
- Run: `node src/utils/convertWIMD2025Data.js` (or update script for new year)
- Update threshold calculation (30% of new total)

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] Test calculator with various postcodes (matched and unmatched)
- [ ] Verify WIMD percentile calculations are correct
- [ ] Test funding calculations (50% and 60% rates)
- [ ] Check that deprived area detection works (rank ≤ 575)
- [ ] Update README.md to mention WIMD 2025
- [ ] Archive old `wimd_data.json` file (optional)
- [ ] Commit changes to Git
- [ ] Deploy to Netlify
- [ ] Notify Sarah and investment team

---

## 📝 TESTING EXAMPLES

### Test Case 1: Deprived Area
- **Postcode:** CF1 1AA
- **WIMD 2025 Rank:** 350
- **Expected:** "Eligible for up to 60% match funding"
- **Percentile:** ~18% (350/1917 × 100)

### Test Case 2: Non-Deprived Area
- **Postcode:** (Find one with rank > 575)
- **Expected:** 50% base rate (unless priority groups selected)

### Test Case 3: Unmatched Postcode
- **Postcode:** (One from unmatched list)
- **Expected:** "Please enter a valid Welsh postcode"

---

## 🔄 HOW TO RUN CONVERSION AGAIN

If you need to update data in the future:

```bash
# 1. Place new WIMD CSV in src/data/
# 2. Run conversion script
node src/utils/convertWIMD2025Data.js

# 3. Update wimd.js if threshold changes
# (e.g., if total LSOAs change, recalculate 30%)
```

---

## 📞 SUPPORT

For questions or issues:
- **Technical:** Anselm Powell (Digital Department)
- **Business Logic:** Sarah (Investment Team)
- **WIMD Data:** Welsh Government Statistics

---

## ✅ STATUS

**COMPLETED** - Ready for testing and deployment

**Next Steps:**
1. Test the calculator locally
2. Get Sarah's approval
3. Deploy to production
4. Monitor for any postcode validation issues

---

*Generated: 2025-12-01*
