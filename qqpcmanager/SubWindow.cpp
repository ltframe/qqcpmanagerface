#include "stdafx.h"

#include "SubWindow.h"


namespace SubWindowSpace{
SubWindow* SubWindowC=0;

DEFINEFUNCTION DragWindowFun(LTExecState* es)
{
	SubWindowC->DragWindow();
	return JsUndefined();
}

DEFINEFUNCTION CloseWindowFun(LTExecState* es)
{
	SubWindowC->CloseWindow();
	return JsUndefined();
}
DEFINEFUNCTION MinWindowFun(LTExecState* es)
{
	SubWindowC->MinWindow();
	return JsUndefined();
}

SubWindow::SubWindow(HWND hwnd)
{	
	HMODULE hModule = ::GetModuleHandle(0);
	applicationpath  = (wchar_t*)malloc((MAX_PATH+1)*sizeof(wchar_t)); 
	GetModuleFileName(NULL, applicationpath, MAX_PATH);
	(wcsrchr(applicationpath, '\\'))[1] = 0;
	int ww = 400,wh=280;
	OleInitialize(0);
	RECT rect = CenterWindow(ww,wh);
	ltskinview= CreateLTFrameInstance(this,L"LTFrame",hwnd,WS_POPUP | WS_VISIBLE,rect.left,rect.top,ww,wh,0);
	instancelist.insert(pair<HWND,SubWindow*>(ltskinview->windowHandle(),this));
	SubWindowC =this;
	ltskinview->BindUserFunction("DragWindow",DragWindowFun,0);
	ltskinview->BindUserFunction("CloseWindow",CloseWindowFun,0);
	ltskinview->BindUserFunction("MinWindow",MinWindowFun,0);
	SetWindowText(ltskinview->windowHandle(),L"LTFrame");
	ltskinview->SetViewTransparent(true);
	wstring path = wstring(applicationpath)+L"./template/login.html";
	ltskinview->loadFile(path.c_str());
	ltskinview->EnableDragFrameChangeSize(false);
	SetForegroundWindow(ltskinview->windowHandle());
}

RECT SubWindow::CenterWindow(int w,int h)
{
	int scrWidth,scrHeight;
	RECT rect;
	scrWidth=GetSystemMetrics(SM_CXSCREEN);
	scrHeight=GetSystemMetrics(SM_CYSCREEN);
	rect.left=(scrWidth-w)/2;
	rect.top=(scrHeight-h)/2;
	return rect;
}
SubWindow::~SubWindow(void)
{
	free(applicationpath);
}
void SubWindow::DragWindow()
{
	ReleaseCapture();
	POINT DownPoint;
	GetCursorPos(&DownPoint);
	SendMessage(ltskinview->windowHandle(),WM_NCLBUTTONDOWN,HTCAPTION,MAKEWPARAM(DownPoint.x,DownPoint.y));
}
void SubWindow::CloseWindow()
{
	ltskinview->ReleaseWindow();
}
void SubWindow::MinWindow()
{
	::ShowWindow(ltskinview->windowHandle(),SW_MINIMIZE);	
}
LRESULT SubWindow::HandleUserMessage(HWND hwnd,UINT uMsg,WPARAM wParam,LPARAM lParam)
{
	SubWindowC = instancelist[hwnd];
	return ltskinview->HandleMessage(hwnd,uMsg,wParam,lParam);
}


LPCWSTR SubWindow::GetWindowClassName()
{
	return L"INDEX";
}
}