$path = "src/components/layout/ChatWidget.tsx"
$lines = Get-Content -Path $path

# Replace language chips line
$lines = $lines | ForEach-Object {
  if ($_ -match '^const LANG_CHIPS:') {
    'const LANG_CHIPS: Chip[] = [{ text: "English" }, { text: "తెలుగు" }];'
  } else {
    $_
  }
}

# Fix language chip matching line
$lines = $lines | ForEach-Object {
  if ($_ -match 'if \(t === .*telugu.*\) return "te";') {
    '  if (t === "తెలుగు" || t === "telugu" || t === "te") return "te";'
  } else {
    $_
  }
}

# Replace fallbackPayload block
$startMatch = $lines | Select-String -Pattern '^const fallbackPayload:' | Select-Object -First 1
if ($startMatch) {
  $startIndex = $startMatch.LineNumber - 1
  $endIndex = $startIndex
  while ($endIndex -lt $lines.Count -and $lines[$endIndex] -notmatch '^\};\s*$') {
    $endIndex++
  }

  if ($endIndex -lt $lines.Count) {
    $before = if ($startIndex -gt 0) { $lines[0..($startIndex - 1)] } else { @() }
    $after = if ($endIndex + 1 -lt $lines.Count) { $lines[($endIndex + 1)..($lines.Count - 1)] } else { @() }

    $newBlock = @(
      'const fallbackPayload: Record<',
      '  string,',
      '  {',
      '    title: string;',
      '    subtitle: string;',
      '    chips: string[];',
      '  }',
      '> = {',
      '  en: {',
      '    title: "Welcome to Sasidhar Gas Agency 👋",',
      '    subtitle: "I’m here to help you.\nPlease choose one of the options below:",',
      '    chips: [',
      '      "🆕 New LPG Connection",',
      '      "⏰ Office Timing",',
      '      "📝 Complaint / Issue Registration",',
      '      "📍 Address & Directions",',
      '      "📞 Delivery Boy & Staff Contact Details",',
      '      "🚚 Estimated Delivery by Areas",',
      '      "🛡️ Safety Guidance",',
      '    ],',
      '  },',
      '  te: {',
      '    title: "శశిధర్ గ్యాస్ ఏజెన్సీకి స్వాగతం 👋",',
      '    subtitle: "నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను.\nదయచేసి క్రింది ఎంపికలలో ఒకదాన్ని ఎంచుకోండి:",',
      '    chips: [',
      '      "🆕 కొత్త LPG గ్యాస్ కనెక్షన్",',
      '      "⏰ కార్యాలయ సమయం",',
      '      "🚚 ప్రాంతాల వారీగా డెలివరీ అంచనా",',
      '      "📝 ఫిర్యాదు / సమస్య నమోదు",',
      '      "📍 చిరునామా & దిశలు",',
      '      "📞 డెలివరీ బాయ్ వివరాలు",',
      '      "🛡️ భద్రతా మార్గదర్శకాలు",',
      '    ],',
      '  },',
      '};'
    )

    $lines = $before + $newBlock + $after
  }
}

Set-Content -Path $path -Value $lines -Encoding utf8
