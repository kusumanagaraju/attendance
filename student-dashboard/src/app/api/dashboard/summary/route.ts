import { NextResponse } from 'next/server';
import { mcpService } from '@/lib/services/mcp.service';
import { stitchService } from '@/lib/services/stitch.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId') || 'demo-user-123';

    // Parallel fetching for performance
    const [realtime, analytics] = await Promise.all([
      mcpService.getStudentRealtimeStatus(studentId),
      stitchService.getStudentAnalytics(studentId)
    ]);

    return NextResponse.json({
      studentId,
      summary: {
        gpa: analytics.gpaTrend[analytics.gpaTrend.length - 1].value,
        attendance: analytics.attendanceRate,
        currentProgress: analytics.courseCompletion,
        status: realtime.status,
        currentClass: realtime.currentClass
      },
      notifications: realtime.urgentNotifications,
      trends: analytics.gpaTrend
    });
  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard summary' },
      { status: 500 }
    );
  }
}
