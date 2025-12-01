import { parse } from 'csv-parse/sync';
import { readFileSync, existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const convertWIMD2025Data = async () => {
    try {
        console.log('='.repeat(60));
        console.log('WIMD 2025 Data Conversion Script');
        console.log('='.repeat(60));
        console.log('');

        // Define paths
        const dataDir = path.join(__dirname, '../data');
        const postcodesCSV = path.join(dataDir, 'PostcodesCSV.csv');
        const wimd2025CSV = path.join(dataDir, 'wimd-2025-index-and-domain-ranks-by-small-area.csv');
        const outputJSON = path.join(dataDir, 'wimd_data_2025.json');

        // Check if files exist
        console.log('Step 1: Checking for required files...');
        if (!existsSync(postcodesCSV)) {
            console.error(`❌ Postcodes file not found: ${postcodesCSV}`);
            process.exit(1);
        }
        console.log(`✅ Found: PostcodesCSV.csv`);

        if (!existsSync(wimd2025CSV)) {
            console.error(`❌ WIMD 2025 file not found: ${wimd2025CSV}`);
            console.log('\nPlease ensure the file is named exactly:');
            console.log('wimd-2025-index-and-domain-ranks-by-small-area.csv');
            process.exit(1);
        }
        console.log(`✅ Found: wimd-2025-index-and-domain-ranks-by-small-area.csv`);
        console.log('');

        // Step 1: Read and parse Postcodes CSV (to get Postcode → LSOA mapping)
        console.log('Step 2: Reading Postcode → LSOA mapping from old file...');
        const postcodesContent = readFileSync(postcodesCSV, 'utf-8');
        const postcodesData = parse(postcodesContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });
        console.log(`✅ Loaded ${postcodesData.length} postcode records`);
        console.log('');

        // Step 2: Read and parse WIMD 2025 CSV (to get LSOA → WIMD 2025 Rank)
        console.log('Step 3: Reading WIMD 2025 LSOA rankings...');
        const wimd2025Content = readFileSync(wimd2025CSV, 'utf-8');
        const wimd2025Data = parse(wimd2025Content, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });
        console.log(`✅ Loaded ${wimd2025Data.length} LSOA records`);
        console.log('');

        // Step 3: Create a Map of LSOA Code → WIMD 2025 Rank for fast lookup
        console.log('Step 4: Building LSOA → WIMD 2025 lookup map...');
        const lsoaToWIMDMap = new Map();

        wimd2025Data.forEach(row => {
            const lsoaCode = row['LSOA code'] || row['lsoa code'] || row['LSOA Code'];
            const wimdRank = row['WIMD 2025 '] || row['WIMD 2025'] || row['wimd 2025'];

            if (lsoaCode && wimdRank) {
                lsoaToWIMDMap.set(lsoaCode.trim(), parseInt(wimdRank));
            }
        });
        console.log(`✅ Created lookup map with ${lsoaToWIMDMap.size} LSOA entries`);
        console.log('');

        // Step 4: Join the data - map each postcode to its WIMD 2025 rank
        console.log('Step 5: Joining Postcode data with WIMD 2025 rankings...');
        const combinedData = [];
        let matchedCount = 0;
        let unmatchedCount = 0;
        const unmatchedLSOAs = new Set();

        postcodesData.forEach(row => {
            const postcode = row['Welsh Postcode'] || row['welsh postcode'];
            const lsoaCode = row['LSOA Code'] || row['lsoa code'];
            const lsoaNameEng = row['LSOA Name (English)'] || row['lsoa name (english)'];
            const lsoaNameCym = row['LSOA Name (Cymraeg)'] || row['lsoa name (cymraeg)'];

            // Look up the WIMD 2025 rank for this LSOA
            const wimd2025Rank = lsoaToWIMDMap.get(lsoaCode);

            if (wimd2025Rank !== undefined) {
                combinedData.push({
                    'Welsh Postcode': postcode,
                    'LSOA Code': lsoaCode,
                    'LSOA Name (English)': lsoaNameEng,
                    'LSOA Name (Cymraeg)': lsoaNameCym,
                    'WIMD 2025 Rank': wimd2025Rank
                });
                matchedCount++;
            } else {
                // LSOA not found in WIMD 2025 data
                unmatchedCount++;
                unmatchedLSOAs.add(lsoaCode);
            }
        });

        console.log(`✅ Successfully matched: ${matchedCount} postcodes`);
        if (unmatchedCount > 0) {
            console.log(`⚠️  Unmatched: ${unmatchedCount} postcodes (${unmatchedLSOAs.size} unique LSOAs)`);
            console.log('');
            console.log('Unmatched LSOA codes (first 10):');
            Array.from(unmatchedLSOAs).slice(0, 10).forEach(lsoa => {
                console.log(`  - ${lsoa}`);
            });
        }
        console.log('');

        // Step 5: Write to JSON file
        console.log('Step 6: Writing combined data to JSON...');
        await writeFile(outputJSON, JSON.stringify(combinedData, null, 2));
        console.log(`✅ Output saved to: ${outputJSON}`);
        console.log('');

        // Step 6: Summary statistics
        console.log('='.repeat(60));
        console.log('CONVERSION SUMMARY');
        console.log('='.repeat(60));
        console.log(`Total postcodes processed: ${postcodesData.length}`);
        console.log(`Total LSOAs in WIMD 2025: ${lsoaToWIMDMap.size}`);
        console.log(`Successfully matched: ${matchedCount} (${((matchedCount / postcodesData.length) * 100).toFixed(2)}%)`);
        console.log(`Unmatched: ${unmatchedCount} (${((unmatchedCount / postcodesData.length) * 100).toFixed(2)}%)`);
        console.log('');

        // Sample entries
        console.log('Sample entries from output:');
        console.log('─'.repeat(60));
        combinedData.slice(0, 3).forEach((entry, idx) => {
            console.log(`${idx + 1}. ${entry['Welsh Postcode']} → LSOA: ${entry['LSOA Code']} → WIMD 2025 Rank: ${entry['WIMD 2025 Rank']}`);
        });
        console.log('─'.repeat(60));
        console.log('');

        // Important notes
        console.log('📋 IMPORTANT NOTES:');
        console.log('─'.repeat(60));
        console.log('• WIMD 2025 has 1,917 LSOAs (up from 1,909 in 2019)');
        console.log('• Top 30% threshold is now: rank ≤ 575 (was 573)');
        console.log('• Next step: Update wimd.js to use wimd_data_2025.json');
        console.log('• Next step: Update threshold from 573 to 575');
        console.log('─'.repeat(60));
        console.log('');
        console.log('✅ Conversion completed successfully!');

    } catch (error) {
        console.error('');
        console.error('❌ ERROR OCCURRED:');
        console.error('─'.repeat(60));
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        process.exit(1);
    }
};

// Run the conversion
convertWIMD2025Data().catch(error => {
    console.error('Top level error:', error);
    process.exit(1);
});
