from pathlib import Path

DEST = Path(__file__).parent

def save(name, content, view='0 0 800 560'):
    (DEST / name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" fill="none">{content}</svg>', encoding='utf-8')

# Technical project covers. These are abstract illustrations, not product screenshots.
GRID = '''<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="#2e4652" stroke-width=".7"/></pattern></defs><path fill="#0e171d" d="M0 0h800v560H0z"/><path fill="url(#grid)" opacity=".34" d="M0 0h800v560H0z"/><g stroke="#45616d" stroke-width="1"><path d="M48 78V48h30M722 48h30v30M48 482v30h30m644 0h30v-30"/><path d="M48 280h12m680 0h12M400 48v12m0 440v12"/></g>'''
def technical(name, artwork):
    save(name, GRID + artwork)

technical('commerce.svg', '''
<g stroke="#2e4652" stroke-width="1"><path d="M80 112h640M80 448h640" stroke-dasharray="4 8"/><circle cx="400" cy="280" r="199" stroke-dasharray="3 8"/></g>
<g stroke="#54c9da" stroke-width="1.5" stroke-linejoin="round"><path d="M192 280h54m-13-7 13 7-13 7M554 209h49v-22h34M554 345h48v27h37"/><path d="M400 391v39H151v-79" stroke="#45616d" stroke-dasharray="5 5"/></g>
<rect x="247" y="129" width="307" height="262" rx="4" fill="#16252e" stroke="#bbf451" stroke-width="1.5"/>
<path d="M247 167h307" stroke="#45616d"/><circle cx="265" cy="148" r="3" fill="#bbf451"/><circle cx="278" cy="148" r="3" fill="#54c9da"/><circle cx="291" cy="148" r="3" fill="#45616d"/><path d="M471 148h60" stroke="#77939f" stroke-width="2"/>
<rect x="269" y="189" width="92" height="92" rx="2" fill="#0e171d" stroke="#2e4652"/>
<path d="m285 218 30-15 30 15-30 15zM285 218v33l30 15 30-15v-33m-30 15v33" stroke="#bbf451" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M382 206h139m-139 16h101m-101 18h124" stroke="#77939f" stroke-width="3"/><path d="M382 266h66" stroke="#54c9da" stroke-width="3"/>
<path d="M269 301h263" stroke="#2e4652"/><path d="M269 320h87m-87 16h111m-111 17h76" stroke="#45616d" stroke-width="3"/>
<rect x="431" y="318" width="101" height="47" rx="2" fill="#bbf451" fill-opacity=".08" stroke="#bbf451"/><path d="M464 341h35m-9-8 9 8-9 8" stroke="#bbf451" stroke-width="1.5"/>
<rect x="92" y="221" width="100" height="130" rx="4" fill="#16252e" stroke="#45616d"/><path d="M110 250h10l8 34h40l8-25h-54" stroke="#54c9da" stroke-width="2" stroke-linejoin="round"/><circle cx="134" cy="294" r="4" stroke="#54c9da" stroke-width="1.5"/><circle cx="165" cy="294" r="4" stroke="#54c9da" stroke-width="1.5"/><path d="M112 326h62" stroke="#45616d" stroke-width="3"/>
<g stroke="#54c9da" stroke-width="1.4"><path d="M637 159v71c0 9 16 16 36 16s36-7 36-16v-71" fill="#16252e"/><ellipse cx="673" cy="159" rx="36" ry="16" fill="#16252e"/><path d="M637 185c0 9 16 16 36 16s36-7 36-16m-72 25c0 9 16 16 36 16s36-7 36-16"/></g>
<rect x="637" y="333" width="72" height="79" rx="4" fill="#16252e" stroke="#45616d"/><path d="m658 369 10 10 20-22" stroke="#bbf451" stroke-width="2"/>
<g fill="#bbf451"><circle cx="247" cy="280" r="4"/><circle cx="554" cy="209" r="4"/><circle cx="554" cy="345" r="4"/><circle cx="151" cy="430" r="3"/></g>
''')

technical('platform.svg', '''
<g stroke="#2e4652" stroke-width="1"><path d="m48 337 352-168 352 168M48 401l352-168 352 168M48 465l352-168 352 168"/><path d="m144 126 512 245M80 157l512 245M16 188l512 245m-416 0 512-245m-448 276 512-245"/></g>
<path d="m194 326 207-98 207 98-207 101z" fill="#111f26" stroke="#45616d"/><path d="m194 326 207 101 207-101v23L401 450 194 349z" stroke="#45616d"/>
<g stroke-linejoin="round">
<path d="m241 172 83-40 83 40-83 40z" fill="#1e333d" stroke="#54c9da"/><path d="m241 172 83 40v176l-83-40z" fill="#16252e" stroke="#54c9da"/><path d="m324 212 83-40v176l-83 40z" fill="#102027" stroke="#54c9da"/>
<path d="m241 216 83 40 83-40m-166 44 83 40 83-40m-166 44 83 40 83-40" stroke="#45616d"/>
<path d="m395 160 83-40 83 40-83 40z" fill="#21312c" stroke="#bbf451"/><path d="m395 160 83 40v176l-83-40z" fill="#172a29" stroke="#bbf451"/><path d="m478 200 83-40v176l-83 40z" fill="#112220" stroke="#bbf451"/>
<path d="m395 204 83 40 83-40m-166 44 83 40 83-40m-166 44 83 40 83-40" stroke="#52704e"/>
</g>
<path d="m260 209 29 14m-29 29 29 14m-29 30 29 14m123-113 29 14m-29 29 29 14m-29 30 29 14" stroke="#77939f" stroke-width="2"/>
<g fill="#bbf451"><circle cx="307" cy="231" r="3"/><circle cx="307" cy="276" r="3"/><circle cx="307" cy="320" r="3"/><circle cx="461" cy="219" r="3"/><circle cx="461" cy="264" r="3"/><circle cx="461" cy="308" r="3"/></g>
<path d="M608 250h61v121h-34m-448-131h-56v152h33" stroke="#54c9da" stroke-width="1.5" stroke-dasharray="5 5"/>
<g transform="translate(588 357)"><rect width="80" height="93" rx="4" fill="#16252e" stroke="#54c9da"/><path d="m40 20 18 25-18 25-18-25z" stroke="#bbf451" stroke-width="1.5"/><path d="M14 81h20m12 0h20" stroke="#45616d" stroke-width="2"/></g>
<g transform="translate(107 378)"><rect width="73" height="63" rx="4" fill="#16252e" stroke="#45616d"/><path d="M126 396h35m-35 10h35m-35 10h22" transform="translate(-107 -378)" stroke="#54c9da" stroke-width="2"/></g>
<path d="M599 105h24m-12-12v24" stroke="#77939f"/>
''')

technical('workflow.svg', '''
<circle cx="400" cy="281" r="188" stroke="#2e4652" stroke-dasharray="5 8"/><circle cx="400" cy="281" r="213" stroke="#2e4652" stroke-opacity=".55"/>
<g stroke="#45616d" stroke-width="1.5" stroke-linejoin="round"><path d="M195 170h58v66h62M185 283h130M195 394h58v-68h62M485 236h61v-66h60M485 281h132M485 326h61v68h60M400 196v-69m0 239v74"/></g>
<path d="M195 170h58v66h62M485 281h132M400 366v74" stroke="#54c9da" stroke-width="1.5" stroke-dasharray="7 12"/>
<rect x="315" y="196" width="170" height="170" rx="4" fill="#16252e" stroke="#bbf451" stroke-width="1.6"/><rect x="333" y="214" width="134" height="134" rx="2" stroke="#52704e"/>
<path d="M344 187v9m18-9v9m19-9v9m19-9v9m19-9v9m19-9v9m19-9v9m-113 170v9m18-9v9m19-9v9m19-9v9m19-9v9m19-9v9m19-9v9M306 223h9m-9 19h9m-9 19h9m-9 19h9m-9 19h9m-9 19h9m-9 19h9m170-114h9m-9 19h9m-9 19h9m-9 19h9m-9 19h9m-9 19h9m-9 19h9" stroke="#bbf451" stroke-width="2"/>
<g stroke="#54c9da" stroke-width="1.5"><path d="m365 259 35-21 35 21v43l-35 21-35-21zM365 259l35 22 35-22m-35 22v42"/><path d="m383 248 34 22m-52 11 35 21 35-21"/></g><circle cx="400" cy="281" r="5" fill="#bbf451"/>
<g fill="#16252e" stroke="#45616d"><rect x="105" y="131" width="90" height="78" rx="4"/><rect x="95" y="244" width="90" height="78" rx="4"/><rect x="105" y="355" width="90" height="78" rx="4"/><rect x="606" y="131" width="90" height="78" rx="4"/><rect x="617" y="244" width="90" height="78" rx="4"/><rect x="606" y="355" width="90" height="78" rx="4"/></g>
<g stroke="#54c9da" stroke-width="1.7"><path d="M132 153h35v34h-35zm0 0 17 18 18-18"/><path d="M119 270h44m-44 13h32m-32 13h44"/><path d="m137 376-13 18 13 18m26-36 13 18-13 18"/><path d="M635 155h32v30h-32zM629 161h-7m7 12h-7m51-12h7m-7 12h7"/><path d="m643 282 13 13 23-27"/><path d="M630 378h42v32h-42zm0 8h42m-31 0v24"/></g>
<rect x="382" y="91" width="36" height="36" rx="3" fill="#16252e" stroke="#77939f"/><path d="m393 109 5 5 9-11" stroke="#bbf451" stroke-width="1.5"/>
<circle cx="400" cy="447" r="7" fill="#bbf451"/><circle cx="400" cy="447" r="14" stroke="#bbf451" stroke-opacity=".3"/>
<g fill="#54c9da"><circle cx="253" cy="170" r="3"/><circle cx="546" cy="236" r="3"/><circle cx="253" cy="394" r="3"/></g>
''')

technical('play.svg', '''
<path d="m111 341 290-146 288 146-288 146z" stroke="#2e4652"/><path d="m159 365 290-146m-194 194 290-146M256 268l290 146M159 317l290 146" stroke="#2e4652"/>
<ellipse cx="403" cy="283" rx="264" ry="137" stroke="#45616d" stroke-dasharray="3 9" transform="rotate(-17 403 283)"/>
<g stroke-linejoin="round"><path d="m257 196 135-67 135 67-135 68z" fill="#16252e" stroke="#bbf451" stroke-width="1.8"/><path d="m257 196 135 68v165l-135-68z" fill="#132326" stroke="#bbf451" stroke-width="1.8"/><path d="m392 264 135-68v165l-135 68z" fill="#102023" stroke="#bbf451" stroke-width="1.8"/>
<path d="m302 174 135 68m-90-90 135 68M302 219l135-67m-90 90 135-68M302 219v165m45-142v165m90-166v165m45-187v165M257 251l135 68 135-68M257 306l135 68 135-68" stroke="#62894b" stroke-width="1"/>
<path d="M392 129v165l-135 67m135-67 135 67" stroke="#52704e" stroke-dasharray="5 5"/>
</g>
<g fill="#bbf451"><circle cx="392" cy="129" r="4"/><circle cx="257" cy="196" r="4"/><circle cx="527" cy="196" r="4"/><circle cx="392" cy="264" r="4"/><circle cx="392" cy="429" r="4"/></g>
<path d="m149 182 37-18 37 18-37 19zM149 182v42l37 19 37-19v-42m-37 19v42" stroke="#54c9da" stroke-width="1.5" stroke-linejoin="round"/><path d="M186 164v42l-37 18m37-18 37 18" stroke="#2e4652"/>
<g transform="translate(527 359)"><path d="M34 0h84c15 0 27 11 31 30l10 49c4 24-15 33-29 14l-18-23H39L22 93C8 112-11 103-7 79L3 30C7 11 19 0 34 0Z" fill="#16252e" stroke="#54c9da" stroke-width="1.5"/><path d="M29 22v29M15 37h29" stroke="#bbf451" stroke-width="2"/><circle cx="119" cy="28" r="5" stroke="#bbf451"/><circle cx="132" cy="41" r="5" stroke="#bbf451"/><path d="M68 27h13m-13 13h13" stroke="#77939f" stroke-width="2"/></g>
<path d="M206 324h-19v57h19m352-127h19v-57h-19" stroke="#77939f" stroke-width="1.5"/><circle cx="572" cy="159" r="6" fill="#54c9da"/><path d="M581 150l17-17h40" stroke="#54c9da" stroke-width="1"/>
''')

technical('security.svg', '''
<defs><clipPath id="shield"><path d="M400 111c48 27 94 40 151 48v128c0 77-71 131-151 174-80-43-151-97-151-174V159c57-8 103-21 151-48Z"/></clipPath></defs>
<circle cx="400" cy="280" r="216" stroke="#2e4652" stroke-dasharray="3 8"/><circle cx="400" cy="280" r="187" stroke="#45616d"/>
<path d="M400 111c48 27 94 40 151 48v128c0 77-71 131-151 174-80-43-151-97-151-174V159c57-8 103-21 151-48Z" fill="#14272b" stroke="#bbf451" stroke-width="1.7"/>
<g clip-path="url(#shield)" stroke="#3b5c4b" stroke-width="1"><path d="M275 100v360m25-360v360m25-360v360m25-360v360m25-360v360m25-360v360m25-360v360m25-360v360m25-360v360m25-360v360m25-360v360M230 161h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340m-340 25h340"/><path d="m235 461 330-330M235 361l230-230M335 461l230-230" stroke="#557947"/></g>
<path d="M400 132c41 21 86 36 131 43v111c0 62-60 111-131 151-71-40-131-89-131-151V175c45-7 90-22 131-43Z" stroke="#52704e"/>
<path d="M169 284h462" stroke="#54c9da" stroke-width="1.5"/><path d="M169 279v10m462-10v10" stroke="#54c9da"/><path d="M249 284h302" stroke="#54c9da" stroke-width="5" stroke-opacity=".13"/>
<rect x="350" y="249" width="100" height="92" rx="5" fill="#16252e" stroke="#bbf451" stroke-width="1.5"/><path d="M368 249v-25a32 32 0 0 1 64 0v25" stroke="#bbf451" stroke-width="2.5"/><circle cx="400" cy="285" r="9" stroke="#bbf451" stroke-width="2"/><path d="M400 294v17" stroke="#bbf451" stroke-width="2"/>
<path d="M197 198v-63h67m272 0h67v63M197 362v63h67m272 0h67v-63" stroke="#45616d" stroke-width="1.5"/>
<g fill="#16252e" stroke="#54c9da"><rect x="146" y="190" width="61" height="44" rx="3"/><rect x="593" y="348" width="61" height="44" rx="3"/></g><path d="m163 211 8 8 17-18m421 168 8 8 17-18" stroke="#bbf451" stroke-width="2"/>
<g fill="#54c9da"><circle cx="603" cy="135" r="3"/><circle cx="197" cy="425" r="3"/><circle cx="551" cy="284" r="4"/><circle cx="249" cy="284" r="4"/></g>
''')

technical('code.svg', '''
<path d="M81 212h47m-24 0v-74h64M657 215h45v171h-45M105 401h60m-37 0v64h172" stroke="#45616d" stroke-width="1.5"/><circle cx="105" cy="401" r="4" fill="#54c9da"/><circle cx="702" cy="215" r="4" fill="#bbf451"/>
<rect x="165" y="101" width="492" height="358" rx="5" fill="#16252e" stroke="#45616d" stroke-width="1.3"/><path d="M165 141h492" stroke="#45616d"/><circle cx="184" cy="121" r="3" fill="#bbf451"/><circle cx="197" cy="121" r="3" fill="#54c9da"/><circle cx="210" cy="121" r="3" fill="#45616d"/><path d="M522 121h111" stroke="#77939f" stroke-width="2"/>
<path d="M211 141v279M165 420h492" stroke="#2e4652"/><g stroke="#45616d" stroke-width="2"><path d="M184 175h10m-10 28h10m-10 28h10m-10 28h10m-10 28h10m-10 28h10m-10 28h10m-10 28h10"/></g>
<g stroke-width="5"><path d="M232 175h68m-41 28h43m-16 28h67m-94 140h33" stroke="#54c9da"/><path d="M317 175h105m-104 28h93m-42 28h142M286 259h73m-73 28h39m-39 28h49" stroke="#bbf451"/><path d="M439 175h72m-81 28h127m-181 56h123m-157 28h139m-129 28h163M259 343h134m-93 28h75" stroke="#77939f"/></g>
<path d="M231 436h72m256 0h73" stroke="#45616d" stroke-width="3"/><circle cx="321" cy="436" r="3" fill="#bbf451"/>
<rect x="493" y="298" width="164" height="117" rx="3" fill="#0e171d" stroke="#bbf451" stroke-width="1.3"/>
<path d="m538 329-22 27 22 27m66-54 22 27-22 27m-23-65-18 78" stroke="#bbf451" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M98 294h31m-15-15v30M701 110h19m-9-9v19" stroke="#45616d"/><path d="m164 486 25-12h292" stroke="#2e4652" stroke-dasharray="5 6"/>
''')

print('Created six technical vector covers.')