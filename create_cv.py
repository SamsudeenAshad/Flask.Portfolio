#!/usr/bin/env python3
"""
Script to create sample CV PDFs
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
import json

def create_friendly_cv():
    """Create a friendly, colorful CV"""
    doc = SimpleDocTemplate("cv/cv_friendly.pdf", pagesize=letter,
                          rightMargin=72, leftMargin=72,
                          topMargin=72, bottomMargin=18)
    
    # Load portfolio data
    with open('../data/portfolio_data.json', 'r') as f:
        data = json.load(f)
    
    story = []
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#4f46e5'),
        alignment=1,  # Center alignment
        spaceAfter=12
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#6b7280'),
        alignment=1,
        spaceAfter=24
    )
    
    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#4f46e5'),
        spaceBefore=24,
        spaceAfter=12
    )
    
    # Header
    story.append(Paragraph(data['personal_info']['name'], title_style))
    story.append(Paragraph(data['personal_info']['title'], subtitle_style))
    
    # Contact info
    contact_data = [
        ['Email:', data['personal_info']['email'], 'Phone:', data['personal_info']['phone']],
        ['Location:', data['personal_info']['location'], 'LinkedIn:', data['personal_info']['linkedin']],
    ]
    contact_table = Table(contact_data, colWidths=[1*inch, 2*inch, 1*inch, 2*inch])
    contact_table.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#4f46e5')),
        ('TEXTCOLOR', (2, 0), (2, -1), colors.HexColor('#4f46e5')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(contact_table)
    story.append(Spacer(1, 12))
    
    # Bio
    story.append(Paragraph("Professional Summary", section_style))
    story.append(Paragraph(data['personal_info']['bio'], styles['Normal']))
    
    # Experience
    story.append(Paragraph("Professional Experience", section_style))
    for exp in data['experience'][:3]:  # Top 3 experiences
        story.append(Paragraph(f"<b>{exp['title']}</b> - {exp['company']}", styles['Heading3']))
        story.append(Paragraph(f"{exp['duration']} | {exp['location']}", styles['Normal']))
        story.append(Paragraph(exp['description'], styles['Normal']))
        for achievement in exp['achievements'][:3]:  # Top 3 achievements
            story.append(Paragraph(f"• {achievement}", styles['Normal']))
        story.append(Spacer(1, 12))
    
    # Education
    story.append(Paragraph("Education", section_style))
    for edu in data['education']:
        story.append(Paragraph(f"<b>{edu['degree']}</b>", styles['Heading3']))
        story.append(Paragraph(f"{edu['institution']} | {edu['duration']} | GPA: {edu['gpa']}", styles['Normal']))
        story.append(Spacer(1, 12))
    
    # Key Skills
    story.append(Paragraph("Key Technical Skills", section_style))
    skills_text = []
    for category in data['skills'][:3]:  # Top 3 categories
        category_skills = [skill['name'] for skill in category['items'][:5]]  # Top 5 skills per category
        skills_text.append(f"<b>{category['category']}:</b> {', '.join(category_skills)}")
    
    for skill_line in skills_text:
        story.append(Paragraph(skill_line, styles['Normal']))
        story.append(Spacer(1, 6))
    
    doc.build(story)
    print("Created cv/cv_friendly.pdf")

def create_formal_cv():
    """Create a formal, professional CV"""
    doc = SimpleDocTemplate("cv/cv_formal.pdf", pagesize=A4,
                          rightMargin=72, leftMargin=72,
                          topMargin=72, bottomMargin=18)
    
    # Load portfolio data
    with open('../data/portfolio_data.json', 'r') as f:
        data = json.load(f)
    
    story = []
    styles = getSampleStyleSheet()
    
    # Custom styles for formal CV
    title_style = ParagraphStyle(
        'FormalTitle',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.black,
        alignment=1,
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'FormalSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        alignment=1,
        spaceAfter=18
    )
    
    section_style = ParagraphStyle(
        'FormalSection',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.black,
        spaceBefore=18,
        spaceAfter=6,
        borderWidth=1,
        borderColor=colors.black,
        borderPadding=3
    )
    
    # Header
    story.append(Paragraph(data['personal_info']['name'].upper(), title_style))
    story.append(Paragraph(data['personal_info']['title'], subtitle_style))
    
    # Contact Information
    contact_info = f"{data['personal_info']['email']} | {data['personal_info']['phone']} | {data['personal_info']['location']}"
    story.append(Paragraph(contact_info, styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
    story.append(Paragraph(data['personal_info']['bio'], styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))
    for exp in data['experience']:
        # Company and position
        exp_header = f"<b>{exp['company']}</b> - {exp['title']}"
        story.append(Paragraph(exp_header, styles['Heading3']))
        story.append(Paragraph(f"{exp['duration']} | {exp['location']}", styles['Normal']))
        story.append(Paragraph(exp['description'], styles['Normal']))
        
        # Key achievements
        for achievement in exp['achievements']:
            story.append(Paragraph(f"• {achievement}", styles['Normal']))
        story.append(Spacer(1, 12))
    
    # Education
    story.append(Paragraph("EDUCATION", section_style))
    for edu in data['education']:
        story.append(Paragraph(f"<b>{edu['degree']}</b>", styles['Heading3']))
        story.append(Paragraph(f"{edu['institution']}, {edu['duration']}", styles['Normal']))
        story.append(Paragraph(f"GPA: {edu['gpa']}", styles['Normal']))
        if 'thesis' in edu:
            story.append(Paragraph(f"Thesis: {edu['thesis']}", styles['Normal']))
        story.append(Spacer(1, 12))
    
    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_style))
    for category in data['skills']:
        skills = ', '.join([skill['name'] for skill in category['items']])
        story.append(Paragraph(f"<b>{category['category']}:</b> {skills}", styles['Normal']))
        story.append(Spacer(1, 6))
    
    # Certifications
    if 'certifications' in data:
        story.append(Paragraph("CERTIFICATIONS", section_style))
        for cert in data['certifications']:
            story.append(Paragraph(f"• {cert['name']} - {cert['issuer']} ({cert['date']})", styles['Normal']))
    
    # Awards
    if 'awards' in data:
        story.append(Paragraph("AWARDS & RECOGNITION", section_style))
        for award in data['awards']:
            story.append(Paragraph(f"• {award['title']} - {award['organization']} ({award['date']})", styles['Normal']))
    
    doc.build(story)
    print("Created cv/cv_formal.pdf")

def main():
    import os
    os.chdir('static')
    os.makedirs('cv', exist_ok=True)
    
    try:
        create_friendly_cv()
        create_formal_cv()
        print("CV files created successfully!")
    except Exception as e:
        print(f"Error creating CV files: {e}")
        print("Note: You may need to install reportlab: pip install reportlab")

if __name__ == "__main__":
    main()
